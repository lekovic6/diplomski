import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http:HttpClient) { }

  uri = 'http://localhost:4000';


  getAuthorById(authorId){
    const data={
      authorId:authorId
    }
    
    return this.http.post(this.uri + '/author/getAuthorById', data);
  }

  searchAuthorByName(searchParam, currentPage, itemsPerPage){
    const data={
      searchParam:searchParam,
      currentPage:currentPage,
      itemsPerPage:itemsPerPage
    }
    
    return this.http.post(this.uri + '/author/searchAuthorByName', data);
  }

  getTotalAuthorCount(searchParam){
    const data={
      searchParam:searchParam,
    }
    
    return this.http.post(this.uri + '/author/getTotalAuthorCount', data);
  }

  updateAuthor(author){
    const data={
      author:author,
    }
    
    return this.http.post(this.uri + '/author/updateAuthor', data);
  }

  insertAuthor(author){
    const data={
      author:author,
    }
    
    return this.http.post(this.uri + '/author/insertAuthor', data);
  }
  
  deleteAuthor(authorId){
    const data={
      authorId:authorId,
    }
    
    return this.http.post(this.uri + '/author/deleteAuthor', data);
  }

  


}
