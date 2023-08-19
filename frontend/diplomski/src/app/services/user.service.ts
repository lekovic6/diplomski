import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  uri = 'http://localhost:4000';


  addToFavouritesList(username, bookId){
    const data={
      username:username,
      bookId:bookId
    }
    
    return this.http.post(this.uri + '/user/addToFavouritesList', data);
  }

  removeFromFavouritesList(username, bookId){
    const data={
      username:username,
      bookId:bookId
    }
    
    return this.http.post(this.uri + '/user/removeFromFavouritesList', data);
  }

  getUserByUsername(username){
    const data={
      username:username,
    }

    return this.http.post(this.uri + '/user/getUserByUsername', data);
  }

  updateUserDetails(user){
    const data={
      user:user,
    }

    return this.http.post(this.uri + '/user/updateUserDetails', data);
  }

  
}
