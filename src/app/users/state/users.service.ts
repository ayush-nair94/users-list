import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class UsersService {

    constructor(private httpClient: HttpClient) {}

    public getUsersList(pPage: number){
        return this.httpClient.get("https://reqres.in/api/users?page=" + pPage);
      }


}

