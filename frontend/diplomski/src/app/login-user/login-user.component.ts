import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent {
  
  constructor(private loginService:LoginService, private router:Router) { }

  username: string;
  password: string;
  badCredentials:Boolean = false;
  errorMessage:String = "";

  loginUser(){
    this.loginService.loginUser(this.username, this.password).subscribe((user:User) =>{
      if (user) {

        if (user.blocked == true){
          this.badCredentials = true;
          this.errorMessage = "Your profile has been blocked by admins!";
          return;
        }
       
        localStorage.setItem('user', JSON.stringify(user));
        this.loginService.isLoggedinSubject.next(true); // sending info to loginService that someone is logged in
        this.router.navigate(['/']);
        
      }
      else {
        this.badCredentials = true;
        this.errorMessage = "Bad credentials";

      }
      
    })
  }

  


}
