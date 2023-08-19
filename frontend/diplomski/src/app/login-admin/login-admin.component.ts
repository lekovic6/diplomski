import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent {


  constructor(private loginService:LoginService, private router:Router){ }

  username: string;
  password: string;

  loginAdmin(){
    this.loginService.loginAdmin(this.username, this.password).subscribe((user:User) =>{

      if (user) {

        if (user.role === 'admin'){
          
          localStorage.setItem('user', JSON.stringify(user));
          this.loginService.isLoggedinSubject.next(true); // sending info to loginService that someone is logged in

          this.router.navigate(['/']);
        }
        else{
          alert('Wrong credentials!');
        }
        
      }
      else alert('Wrong credentials!');

    })
  }

}
