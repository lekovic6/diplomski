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

  

  loginUser(){
    this.loginService.loginUser(this.username, this.password).subscribe((user:User) =>{
      if (user) {

        /* ne trea mi ovo
        if (user.verifiedByAdmin == false){
          alert('You are not yet verified by Admins! Try again later!');
          return;
        }
        if (user.declined == true){
          alert('Your access has been declined!');
          return;
        }
        */

        // cuvanje loggovanog usera
        localStorage.setItem('user', JSON.stringify(user));
        this.loginService.isLoggedinSubject.next(true); // sending info to loginService that someone is logged in
        this.router.navigate(['/']);
        
      }
      else alert('Bad Credentials!');
    })
  }

  


}
