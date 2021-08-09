import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { IUser, User } from 'src/app/interfaces/IUser';


@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userData: IUser = new User();
  @Output() deleteUserData: EventEmitter<IUser> = new EventEmitter<IUser>();

  constructor() {
      
  }

  ngOnInit() {
    
  }

  deleteUser() {
      this.deleteUserData.emit(this.userData);
  }

  @Input()
  set userDetails(pValue: IUser) {
    this.userData = pValue;
  }

}
