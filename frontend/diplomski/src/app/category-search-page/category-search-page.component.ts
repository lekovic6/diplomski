import { Component } from '@angular/core';
import { BookService } from '../services/book.service';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../models/book';

@Component({
  selector: 'app-category-search-page',
  templateUrl: './category-search-page.component.html',
  styleUrls: ['./category-search-page.component.css']
})
export class CategorySearchPageComponent {
  constructor(private bookService:BookService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.genreToShow = params['categoryName'];

      
      this.bookService.getAllBooksFromGenre(this.genreToShow).subscribe((books:Book[])=>{
        this.booksToShow = books;
      })
    })
  }

  searchParam:String = "";
  genreToShow:String = "";
  booksToShow:Book[] = [];
  
  search(){
    
  }

}
