import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './components/user/user.component';

import { UsersListComponent } from './components/users-list/users-list.component';



const routes: Routes = [
  {
    path: '',
    component: UsersListComponent,
    children: [
        { path: ':id', component: UserComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }