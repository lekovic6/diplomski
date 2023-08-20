import { Component } from '@angular/core';
import { BookService } from '../services/book.service';
import { LoginService } from '../services/login.service';
import { User } from '../models/user';
import { Book } from '../models/book';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.css']
})
export class MyListComponent {

  constructor(private bookService:BookService, private loginService:LoginService, private userService:UserService){}

  currentLoggedUser:User;
  bookList:Book[] = [];

  itemsPerPage: number = 5;
  totalItems: number;
  currentPage: number = 1;
  
  ngOnInit(): void {

    this.userService.getUserByUsername(this.loginService.getUser().username).subscribe((user:User)=>{
      this.currentLoggedUser = user;
      
      this.currentLoggedUser.favouritesList.forEach((bookId:String) => {
        this.bookService.getBookById(bookId).subscribe((book:Book)=>{
          this.bookList.push(book);
        })
      });
    })
  }

  removeFromReadingList(book:Book){

    this.userService.removeFromFavouritesList(this.currentLoggedUser.username, book._id).subscribe(resp=>{
      if(resp["message"] == "updated"){
        let index = this.bookList.indexOf(book);
        this.bookList.splice(index, 1);
        alert("Removed from my reading list!")
      }
      else{
        alert("Error in removing the book from the reading list!")
      }
    })
    
  }

  
}
