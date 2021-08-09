import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/IUser';
import { UsersService } from '../../state/users.service';
import { animate, group, state, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';


@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({height: '*', opacity: 0})),
      transition(':leave', [
          style({height: '*', opacity: 1}),

          group([
              animate(300, style({height: 0})),
              animate('100ms ease-in-out', style({'opacity': '0'}))
          ])

      ]),
      transition(':enter', [
          style({height: '0', opacity: 0}),

          group([
              animate(300, style({height: '*'})),
              animate('400ms ease-in-out', style({'opacity': '1'}))
          ])

      ])
  ]),
  trigger('rotatedState', [
    state('default', style({ transform: 'rotate(0)' })),
    state('rotated', style({ transform: 'rotate(-180deg)' })),
    transition('rotated => default', animate('400ms ease-out')),
    transition('default => rotated', animate('400ms ease-in'))
    ])
  ]
})
export class UsersListComponent implements OnInit {
  usersList: Array<IUser> = [];
  page: number = 1;
  count: number = 0;
  pageSize: number = 6;
  searchTerm: string = '';

  constructor(private _userSvc: UsersService, private router: Router) {}

  ngOnInit() {
    this.fetchUsersList(this.page);
  }

  fetchUsersList(pPage: number) {
    this._userSvc.getUsersList(pPage).subscribe((data: any) => {
        this.usersList = data.data;
        this.count = data.total;
        this.pageSize = data.per_page;
        this.usersList.forEach((user: IUser) => { 
            user['expanded'] = false; 
            user['state'] = 'default';
      })
    })
  }

  expand(pIndex: number) {
      this.userData[pIndex].expanded = !this.userData[pIndex].expanded;
      this.userData[pIndex].state = (this.userData[pIndex].state === 'default' ? 'rotated' : 'default');
      this.userData[pIndex].expanded ? this.navigateToUserComponent(pIndex) : this.navigateToUsers();
  }

  navigateToUserComponent(pIndex: number) {
    this.router.navigate(['/users/' + this.userData[pIndex].id]);
  }

  navigateToUsers() {
    this.router.navigate(['/users']);
  }

  deleteUser(pData: IUser) {
      this.userData.forEach((user: IUser, index: number) => {
          if(user.id == pData.id) {
              user.expanded = false;
              user.state = 'default';
              this.usersList.splice(index, 1);
          }
      })
      this.router.navigate(['/users']);
  }

  handlePageChange(pCount: number) {
      this.page = pCount;
      this.fetchUsersList(this.page);
  }

  get userData(): Array<IUser> {
      return this.usersList.filter((user: IUser) => {
        return user.first_name.toLowerCase().includes(this.searchTerm.toLowerCase()) || user.last_name.toLowerCase().includes(this.searchTerm.toLowerCase())
      })
  }

}
