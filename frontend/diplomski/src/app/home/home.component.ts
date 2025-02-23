import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book';
import { BookService } from '../services/book.service';
import { Category } from '../models/category';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private bookService: BookService, private router: Router) { }

  numberOfFeaturedOnPage = 10;
  numberOfTopPicksOnPage = 10;

  featuredBooks: Book[] = [];
  topPicks: Book[] = [];
  sciFiBooks: Book[] = [];
  fantasyBooks: Book[] = [];
  allCategories: Category[] = [];

  searchParam: String = "";

  ngOnInit(): void {
    // dohvati zanrove sa homea

    this.bookService.getRandomBooks(this.numberOfFeaturedOnPage).subscribe((randomFeaturedBooks: Book[]) => {
      this.featuredBooks = randomFeaturedBooks;
      this.featuredBooks.forEach(book => {
        const acceptedReviews = book.reviews.filter(review => review.accepted);
        const totalRating = acceptedReviews.reduce((acc, review) => acc + review.rating, 0);
        const numOfRatings = acceptedReviews.length;
        book.averageRating = numOfRatings ? parseFloat((totalRating / numOfRatings).toFixed(2)) : 0;
      });

    })

    this.bookService.getRandomBooks(this.numberOfTopPicksOnPage).subscribe((randomTopPickBooks: Book[]) => {
      this.topPicks = randomTopPickBooks;
      this.topPicks.forEach(book => {
        const acceptedReviews = book.reviews.filter(review => review.accepted);
        const totalRating = acceptedReviews.reduce((acc, review) => acc + review.rating, 0);
        const numOfRatings = acceptedReviews.length;
        book.averageRating = numOfRatings ? parseFloat((totalRating / numOfRatings).toFixed(2)) : 0;
      });

    })

    this.bookService.getAllBooksFromGenre('science_fiction').subscribe((sciFiBooks: Book[]) => {
      this.sciFiBooks = sciFiBooks;
      this.sciFiBooks.forEach(book => {
        const acceptedReviews = book.reviews.filter(review => review.accepted);
        const totalRating = acceptedReviews.reduce((acc, review) => acc + review.rating, 0);
        const numOfRatings = acceptedReviews.length;
        book.averageRating = numOfRatings ? parseFloat((totalRating / numOfRatings).toFixed(2)) : 0;
      });

    })

    this.bookService.getAllBooksFromGenre('fantasy').subscribe((fantasyBooks: Book[]) => {
      this.fantasyBooks = fantasyBooks;
      this.fantasyBooks.forEach(book => {
        const acceptedReviews = book.reviews.filter(review => review.accepted);
        const totalRating = acceptedReviews.reduce((acc, review) => acc + review.rating, 0);
        const numOfRatings = acceptedReviews.length;
        book.averageRating = numOfRatings ? parseFloat((totalRating / numOfRatings).toFixed(2)) : 0;
      });

    })

    this.bookService.getAllCategories().subscribe((categories: Category[]) => {
      this.allCategories = categories;
    })

  }

  search() {
    this.router.navigate(['/searchPage', this.searchParam]);
    //  {path: 'searchPage/:searchParam', component:SearchPageComponent},
  }

}
