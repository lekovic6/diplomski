import { Component } from '@angular/core';
import { BookService } from '../services/book.service';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../models/book';
import { Category } from '../models/category';

@Component({
  selector: 'app-category-search-page',
  templateUrl: './category-search-page.component.html',
  styleUrls: ['./category-search-page.component.css']
})
export class CategorySearchPageComponent {
  constructor(private bookService:BookService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.genreCategoryName = params['categoryName'];
      this.currentPage = 1;

      this.bookService.getCategoryShowName(this.genreCategoryName).subscribe((category:Category)=>{
        this.genreShowName = category.showName;
      })

      this.bookService.searchBooksFromGenre(this.searchParam,  this.currentPage, this.itemsPerPage, this.genreCategoryName).subscribe((books:Book[])=>{
        this.booksToShow = books;
      })

      this.bookService.getTotalBooksCountFromGenre(this.searchParam, this.genreCategoryName).subscribe((count:number) => {
        this.totalItems = count;
      });

    })
  }

  searchParam:String = "";
  genreCategoryName:String = "";
  genreShowName:String = "";
  booksToShow:Book[] = [];

  itemsPerPage: number = 5;
  totalItems: number;
  currentPage: number = 1;
  
  searchGenre(){
    this.bookService.searchBooksFromGenre(this.searchParam,  this.currentPage, this.itemsPerPage, this.genreCategoryName).subscribe((books:Book[])=>{
      this.booksToShow = books;
    })

    this.bookService.getTotalBooksCountFromGenre(this.searchParam, this.genreCategoryName).subscribe((count:number) => {
      this.totalItems = count;
    });
  }

}
