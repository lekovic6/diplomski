import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../services/book.service';
import { Book, Review } from '../models/book';
import { LoginService } from '../services/login.service';
import { Category } from '../models/category';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent {

  constructor(private bookService:BookService, private route: ActivatedRoute,
    private loginService:LoginService, private userService:UserService, 
    private router:Router, private location: Location){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.bookId = params['bookId'];


      this.myReview = new Review();
      this.hasReview = false;
      this.isInReadingList = false;
      
      this.bookService.getBookById(this.bookId).subscribe((book:Book)=>{
        this.bookToShow = book;

        const totalRating = this.bookToShow.reviews.reduce((acc, review) => acc + review.rating, 0);
        const numOfRatings = this.bookToShow.reviews.length;
        this.bookToShow.averageRating = numOfRatings ? parseFloat((totalRating / numOfRatings).toFixed(2)) : 0;

        this.bookService.getCategoryShowName(this.bookToShow.genre).subscribe((category:Category)=>{
          this.categoryShowName = category.showName;
        })

        this.isUserLoggedIn = this.loginService.isLoggedinSubject.getValue();

        if (this.isUserLoggedIn){
          this.userService.getUserByUsername(this.loginService.getUser().username).subscribe((user:User)=>{
            this.currentLoggedUser = user;
            this.myReview.username = this.currentLoggedUser.username;
  
            // Checking whether the book is in users favourties list
            if (this.currentLoggedUser.favouritesList != null && this.currentLoggedUser.favouritesList.length > 0){
              this.currentLoggedUser.favouritesList.forEach((bookid:String) => {
                if (bookid == this.bookId){
                  this.isInReadingList = true;
                }
              });
            }
          });
        }
        
        // Checking whether user already has a review for this book
        if (this.bookToShow.reviews != null){
          this.bookToShow.reviews.forEach(review => {
            if (review.accepted == true){
              this.noReviewsToShow = false;
            }

            if(review.username == this.loginService.getUser()?.username){
              this.hasReview = true;
              this.myReview = review;
            }

          });
        }

        this.bookService.getAllBooksFromGenre(this.bookToShow.genre).subscribe((books:Book[])=>{
          this.similarBooks = books;
        })

      })

    })

  }

  currentLoggedUser:User;
  hasReview:Boolean = false;
  isUserLoggedIn = false;
  myReview:Review = new Review();

  bookId:String = "";
  bookToShow:Book;
  categoryShowName:String = "";
  similarBooks:Book[] = [];

  isInReadingList:Boolean = false;
  noReviewsToShow:Boolean = true;

  addToFavouritesList(){
    this.userService.addToFavouritesList(this.currentLoggedUser.username, this.bookId).subscribe(resp=>{
      if(resp["message"] == "updated"){
        this.isInReadingList = !this.isInReadingList;
        alert("Added to my reading list!")
      }
      else{
        alert("Error in adding a book to reading list!")
      }
    })
  }

  removeFromFavouritesList(){
    this.userService.removeFromFavouritesList(this.currentLoggedUser.username, this.bookId).subscribe(resp=>{
      if(resp["message"] == "updated"){
        this.isInReadingList = !this.isInReadingList;
        alert("Removed from my reading list!")
      }
      else{
        alert("Error in removing the book from the reading list!")
      }
    })
  }

  deleteBook(){
    this.bookService.deleteBook(this.bookId).subscribe(resp=>{
      if(resp["message"] = "deleted"){
        alert("Book has been deleted!")
        this.location.back();
      }
      else{
        alert("Error in deleting book!")
      }
    })
  }

  leaveReview(){
    this.myReview.pending = true;
    this.myReview.accepted = false;
    this.myReview.declined = false;

    this.bookService.insertReview(this.bookId, this.myReview).subscribe(resp=>{
      if(resp["message"] == "inserted"){
        alert("review inserted")!
        window.location.reload();
      }
      else{
        alert("error while inserting a review")
      }
    })
  }

  saveReviewChanges(){
    // username usera ostaje isti
    this.bookService.updateReview(this.bookId, this.myReview).subscribe(resp=>{
      if(resp["message"] == "updated"){
        alert("Review changes saved!")!
        window.location.reload();
      }
      else{
        alert("error while changing a review")
      }
    })
  }

  deleteReview(){
    this.bookService.deleteReview(this.bookId, this.myReview).subscribe(resp=>{
      if(resp["message"] == "deleted"){
        alert("Review deleted!")!
        window.location.reload();
      }
      else{
        alert("error while deleting a review")
      }
    })
  }

  deleteReviewByAdmin(review){
    this.bookService.deleteReview(this.bookId, review).subscribe(resp=>{
      if(resp["message"] == "deleted"){
        alert("Review deleted!")!
        window.location.reload();
      }
      else{
        alert("error while deleting a review")
      }
    })
  }
}

