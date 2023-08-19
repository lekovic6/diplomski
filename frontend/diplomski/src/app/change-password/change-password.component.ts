import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { LoginService } from '../services/login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

  constructor(private userService:UserService, private loginService:LoginService) { }
  
  changePasswordForm: FormGroup;
  oldPassword:string;
  user:User;

  ngOnInit(): void {
    this.userService.getUserByUsername(this.loginService.getUser().username).subscribe((user:User)=>{
      this.oldPassword = user.password
    })

    this.changePasswordForm = new FormGroup({
      'oldPassword': new FormControl(null, Validators.required),
      'newPassword': new FormControl(null, [
        Validators.required,
        Validators.pattern('^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z][A-Za-z\\d@$!%*#?&]{6,11}$') // password pattern
      ]),
      'confirmPassword': new FormControl(null, [
        Validators.required,
        Validators.pattern('^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z][A-Za-z\\d@$!%*#?&]{6,11}$') // password pattern
      ]),
    });
  }

  changePassword() {
    if (this.changePasswordForm.value.oldPassword !== this.oldPassword){
      alert('Old Password is incorrect');
      return;
    }
    if (this.changePasswordForm.value.newPassword !== this.changePasswordForm.value.confirmPassword) {
      alert('The new password and the confirmation password do not match!');
      return;
    }
    
    this.loginService.changePassword(this.loginService.getUser().username, this.changePasswordForm.value.newPassword).subscribe(res =>{
      if (res['message'] == 'password changed') {
        this.userService.getUserByUsername(this.loginService.getUser().username).subscribe((user:User)=>{
          this.oldPassword = user.password
          localStorage.setItem('user', JSON.stringify(user));
        })
        alert('Password changed successfully');
      }
      else alert('Changing password failed!');
    });
  }


}
