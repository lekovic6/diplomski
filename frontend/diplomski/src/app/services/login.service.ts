import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  private readonly USER_KEY = 'user';

  uri = 'http://localhost:4000';


  loginUser(username, password){
    const data={
      username: username,
      password: password
    }
    
    return this.http.post(this.uri + '/guest/loginUser', data);
  }

  loginAdmin(username, password){
    const data={
      username: username,
      password: password
    }
    
    return this.http.post(this.uri + '/guest/loginAdmin', data);
  }
  

  private hasUser(): boolean {
    return !!localStorage.getItem(this.USER_KEY);
  }

  
  isLoggedinSubject = new BehaviorSubject<boolean>(this.hasUser());
  isLoggedIn(): Observable<boolean> {
    return this.isLoggedinSubject.asObservable();
  }

  logout(): void {
    localStorage.removeItem(this.USER_KEY);
    this.isLoggedinSubject.next(false);
  }

  getUser(): User {
    const userString = localStorage.getItem(this.USER_KEY);
    return JSON.parse(userString);
  }

  getAllUsers(){
    const data = {}

    return this.http.post(this.uri + '/user/getAllUsers', data);
  }

  changePassword(username, newPassword){
    const data = {
      username:username,
      newPassword:newPassword
    };

    return this.http.post(this.uri + '/user/changePassword', data);
  }



}
