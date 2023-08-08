import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http:HttpClient) { }

  uri = 'http://localhost:4000';


  getAllBooks(){
    const data={}
    
    return this.http.post(this.uri + '/book/getAllBooks', data);
  }

  getAllCategories(){
    const data={}
    
    return this.http.post(this.uri + '/book/getAllCategories', data);
  }

  getRandomBooks(numberOfBooks){
    const data={
      numberOfBooks:numberOfBooks
    }
    
    return this.http.post(this.uri + '/book/getRandomBooks', data);
  }

  getAllBooksFromGenre(genre){
    const data={
      genre:genre
    }
    
    return this.http.post(this.uri + '/book/getAllBooksFromGenre', data);
  }

  searchBooks(searchParam){
    const data={
      searchParam:searchParam
    }
    
    return this.http.post(this.uri + '/book/searchBooks', data);
  }


}
