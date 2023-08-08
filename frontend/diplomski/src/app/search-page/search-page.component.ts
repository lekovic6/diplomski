import { Component } from '@angular/core';
import { Book } from '../models/book';
import { BookService } from '../services/book.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent {


  constructor(private bookService:BookService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.searchParam = params['searchParam'];

      this.bookService.searchBooks(this.searchParam).subscribe((books:Book[])=>{
        this.booksToShow = books;
      })
    })
  }

  searchParam:String = "";
  booksToShow:Book[] = [];
  
  search(){
    
  }
}
