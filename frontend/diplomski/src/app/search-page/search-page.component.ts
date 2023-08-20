import { Component } from '@angular/core';
import { Book } from '../models/book';
import { BookService } from '../services/book.service';
import { ActivatedRoute } from '@angular/router';
import { Author } from '../models/author';
import { AuthorService } from '../services/author.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent {

  constructor(private bookService:BookService, private route: ActivatedRoute, private authorService:AuthorService){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.searchParam = params['searchParam'];
      this.search();
    })
  }

  searchParam:String = "";
  searchType:String = 'book';

  booksToShow:Book[] = [];
  authorsToShow:Author[] = [];

  itemsPerPage: number = 5;
  totalItems: number;
  currentPage: number = 1;

  search(){
    if (this.searchType === 'book') {
      this.authorsToShow = [];

      this.bookService.searchBooks(this.searchParam, this.currentPage, this.itemsPerPage).subscribe((books: Book[]) => {
        this.booksToShow = books;
      });

      this.bookService.getTotalBooksCount(this.searchParam).subscribe((count: number) => {
        this.totalItems = count;
      });

    } else if (this.searchType === 'author') {
      this.booksToShow = [];

      this.authorService.searchAuthorByName(this.searchParam, this.currentPage, this.itemsPerPage).subscribe((authors: Author[]) => {
        this.authorsToShow = authors;
      });

      this.authorService.getTotalAuthorCount(this.searchParam).subscribe((count: number) => {
        this.totalItems = count;
      });
    }
  }

  onRadioChange() {
    this.currentPage = 1;
    this.search();
  }


}
