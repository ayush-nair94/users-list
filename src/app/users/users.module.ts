import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import 'rxjs';
import { UserComponent } from './components/user/user.component';

import { UsersListComponent } from './components/users-list/users-list.component';
import { UsersService } from './state/users.service';
import { UsersRoutingModule } from './users.routes';



@NgModule({
    imports: [
        UsersRoutingModule,
        CommonModule,
        FormsModule,
        NgxPaginationModule
    ],
    declarations: [
        UsersListComponent,
        UserComponent
    ],
    providers: [
        UsersService
    ],
    exports: [ UsersListComponent]
})

export class UsersModule {
}
