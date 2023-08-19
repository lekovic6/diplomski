import { Component } from '@angular/core';
import { BookService } from '../services/book.service';
import { ActivatedRoute } from '@angular/router';
import { AuthorService } from '../services/author.service';
import { Author } from '../models/author';
import { LoginService } from '../services/login.service';
import { Book } from '../models/book';
import { User } from '../models/user';
import { Location } from '@angular/common';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.css']
})
export class AuthorDetailsComponent {

  constructor(private bookService:BookService, private authorService:AuthorService,
    private route: ActivatedRoute, private loginService:LoginService, private location: Location){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.authorId = params['authorId'];

      this.currentLoggedUser = this.loginService.getUser();

      this.authorService.getAuthorById(this.authorId).subscribe((author:Author)=>{
        this.authorToShow = author;

        this.bookService.getAllBooksByAuthorsId(this.authorId).subscribe((books:Book[])=>{
          this.authorsWorks = books;
        })

      })

    })

  }

  authorId:String = "";
  authorToShow:Author = null;
  authorsWorks:Book[] = [];

  isUserLoggedIn = false;
  currentLoggedUser:User;

  itemsPerPage: number = 5;
  totalItems: number;
  currentPage: number = 1;

  deleteAuthor(){
    this.authorService.deleteAuthor(this.authorId).subscribe(resp=>{
      if(resp["message"] = "deleted"){
        alert("Author has been deleted!")
        this.location.back();
      }
      else{
        alert("Error in deleting author!")
      }
    })
  }

}
