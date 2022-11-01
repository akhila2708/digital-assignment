import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  usersListURL: string;

  constructor(private http: HttpClient) {
    this.usersListURL = 'https://jsonplaceholder.typicode.com/users';
  }
  //API call to fetch users
  getUsersList() {
    return this.http.get<any>(this.usersListURL);
  }
}
