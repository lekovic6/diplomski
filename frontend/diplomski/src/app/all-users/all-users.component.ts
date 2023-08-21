import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { LoginService } from '../services/login.service';
import { User } from '../models/user';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent {

  constructor(private loginService:LoginService, private userService:UserService) {}

  ngOnInit() {
    this.searchUsers();
  }

  usersToShow:User[] = [];

  itemsPerPage: number = 5;
  totalItems: number;
  currentPage: number = 1;

  searchParam:String = "";

  searchUsers(){
    this.userService.searchUsers(this.searchParam, this.currentPage, this.itemsPerPage).subscribe((user: User[]) => {
      this.usersToShow = user;
    });
    this.userService.getTotalUsersCount(this.searchParam).subscribe((count: number) => {
      this.totalItems = count;
    });
  }

  unblock(user:User){
    this.userService.setBlockFlag(user, false).subscribe((resp) => {
      if (resp["message"] == "updated"){
        window.location.reload()
        alert("'" + user.username + "' UNBLOCKED!");
      }
      else alert("error")
    });
  }

  block(user:User){
    this.userService.setBlockFlag(user, true).subscribe((resp) => {
      if (resp["message"] == "updated"){
        window.location.reload()
        alert("'" + user.username + "' BLOCKED!");
      }
      else alert("error")
    });
  }


}
