import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  uniqueUsername(username){
    const data = {
      username:username,
    }

    return this.http.post(this.uri + '/guest/uniqueUsername', data);  ;
  }

  uniqueEmail(email){
    const data = {
      email:email,
    }

    return this.http.post(this.uri + '/guest/uniqueEmail', data);  ;
  }

  registerUser(username, password, email, role, firstname, lastname, base64Data, base64ContentType){
    const data = {
      username:username,
      password:password,
      email:email,
      role:role,

      firstname:firstname,
      lastname:lastname,

      base64Data:base64Data,
      base64ContentType:base64ContentType
    }

    return this.http.post(this.uri + '/guest/registerUser', data);  
  }

  registerAgency(username, password, email, role, agencyName, agencyAdress, tid, description, base64Data, base64ContentType, maxNumberOfWorkers){
    const data = {
      username:username,
      password:password,
      email:email,
      role:role,

      agencyName:agencyName,
      agencyAdress:agencyAdress,
      tid:tid,
      description:description,

      base64Data:base64Data,
      base64ContentType:base64ContentType,

      maxNumberOfWorkers:maxNumberOfWorkers
    }
    
    return this.http.post(this.uri + '/guest/registerAgency', data);  

  }
}
