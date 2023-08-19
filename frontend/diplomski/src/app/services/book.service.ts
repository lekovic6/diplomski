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

  getBookById(bookId){
    const data={
      bookId:bookId
    }
    
    return this.http.post(this.uri + '/book/getBookById', data);
  }

  getAllCategories(){
    const data={}
    
    return this.http.post(this.uri + '/book/getAllCategories', data);
  }

  getCategoryShowName(categoryName){
    const data={
      categoryName:categoryName
    }
    
    return this.http.post(this.uri + '/book/getCategoryShowName', data);
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

  searchBooks(searchParam, currentPage, itemsPerPage){
    const data={
      searchParam:searchParam,
      currentPage:currentPage,
      itemsPerPage:itemsPerPage
    }
    
    return this.http.post(this.uri + '/book/searchBooks', data);
  }

  searchBooksFromGenre(searchParam, currentPage, itemsPerPage, categoryName){
    const data={
      searchParam:searchParam,
      currentPage:currentPage,
      itemsPerPage:itemsPerPage,
      categoryName:categoryName
    }

    return this.http.post(this.uri + '/book/searchBooksFromGenre', data);
  }

  getTotalBooksCount(searchParam){
    const data={
      searchParam:searchParam
    }
    
    return this.http.post(this.uri + '/book/getTotalBooksCount', data);
  }

  getTotalBooksCountFromGenre(searchParam, categoryName){
    const data={
      searchParam:searchParam,
      categoryName:categoryName
    }
    
    return this.http.post(this.uri + '/book/getTotalBooksCountFromGenre', data);
  }

  getAllBooksByAuthorsId(authorId){
    const data={
      authorId:authorId
    }
    
    return this.http.post(this.uri + '/book/getAllBooksByAuthorsId', data);
  }

  updateBook(book){
    const data={
      book:book
    }
    
    return this.http.post(this.uri + '/book/updateBook', data);
  }

  insertBook(book){
    const data={
      book:book
    }
    
    return this.http.post(this.uri + '/book/insertBook', data);
  }

  deleteBook(bookId){
    const data={
      bookId:bookId
    }
    
    return this.http.post(this.uri + '/book/deleteBook', data);
  }

  insertReview(bookId, review){
    const data={
      bookId:bookId,
      review:review
    }
    
    return this.http.post(this.uri + '/book/insertReview', data);
  }

  updateReview(bookId, review){
    const data={
      bookId:bookId,
      review:review
    }
    
    return this.http.post(this.uri + '/book/updateReview', data);
  }

  deleteReview(bookId, review){
    const data={
      bookId:bookId,
      review:review
    }
    
    return this.http.post(this.uri + '/book/deleteReview', data);
  }

  getBooksWithPendingReviews(){
    const data={}
    
    return this.http.post(this.uri + '/book/getBooksWithPendingReviews', data);
  }

  respondToReview(bookId, reviewUsername, respondFlag){
    const data={
      bookId:bookId,
      reviewUsername:reviewUsername,
      respondFlag:respondFlag
    }
    
    return this.http.post(this.uri + '/book/respondToReview', data);
  }
  


}
