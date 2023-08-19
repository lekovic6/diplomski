import { Component } from '@angular/core';
import { Book } from '../models/book';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-pending-reviews',
  templateUrl: './pending-reviews.component.html',
  styleUrls: ['./pending-reviews.component.css']
})
export class PendingReviewsComponent {


  constructor(private bookService:BookService) { }

  booksWithPendingReviews: Book[] = [];


  ngOnInit(): void {
    this.fetchPendingReviews();
  }

  fetchPendingReviews() {
    this.bookService.getBooksWithPendingReviews().subscribe((books:Book[])=>{
      this.booksWithPendingReviews = books;
    })
  }

  acceptReview(bookId: string, reviewUsername: string) {
    this.bookService.respondToReview(bookId, reviewUsername, true).subscribe(resp=>{
      if(resp["message"] == 'updated'){
        alert("Review accepted!")
        //window.location.reload();
        // ili 
        this.fetchPendingReviews();
      }
      else{
        alert("error in accepting review!")
      }
    })
  }

  declineReview(bookId: string, reviewUsername: string) {
    this.bookService.respondToReview(bookId, reviewUsername, false).subscribe(resp=>{
      if(resp["message"] == 'deleted'){
        alert("Review declined!")
        //window.location.reload();
        // ili 
        this.fetchPendingReviews();
      }
      else{
        alert("error in declining review!")
      }
    })
  }

} 
