import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/dto/user.data';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  userList: User[];
  selectedUser: User;
  showLoading: boolean;
  error: boolean = false;
  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.showLoading = true;
    //API call to fetch Users
    this.usersService.getUsersList().subscribe({
      next: (data) => {
        this.userList = data;
        this.userList.forEach((user: User) => {
          user.active = false;
        });
        this.showLoading = false;
        this.error = false;
      },
      error: (e) => {
        console.error(e);
        this.showLoading = false;
        this.error = true;
      },
      complete: () => console.info('complete'),
    });
  }
  // highlight a button when user selects an user
  onSelectedUser(selectedUser: User) {
    selectedUser.active = true;
    this.selectedUser = selectedUser;
  }
  //get first name from name attribute
  getUserFirstName(name: string) {
    return name.split(' ')[0] === ('Mrs.' || 'Mr.' || 'Ms.')
      ? name.split(' ')[1]
      : name.split(' ')[0];
  }
}
