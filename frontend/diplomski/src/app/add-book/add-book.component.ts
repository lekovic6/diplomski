import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../services/book.service';
import { LoginService } from '../services/login.service';
import { AuthorService } from '../services/author.service';
import { Book } from '../models/book';
import { Category } from '../models/category';
import { Author } from '../models/author';
import { Observable, ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {

  constructor(private bookService:BookService, private loginService:LoginService, private authorService:AuthorService){
    this.bookToAdd.authors = [];
  }

  bookToAdd:Book = new Book();
  allCategories:Category[] = [];

  addingAuthor = false; // To toggle the add author form and search
  searchParam = '';     // For searching existing authors
  searchResults:Author[] = [];   // Results from the search
  newAuthorName = '';   // Name of the new author to be added

  itemsPerPage: number = 5;
  totalItems: number;
  currentPage: number = 1;

  ngOnInit(): void {
    this.bookService.getAllCategories().subscribe((allCat:Category[])=>{
      this.allCategories = allCat;
    })
  }

  deleteAuthor(index: number) {
    this.bookToAdd.authors.splice(index, 1);
  }

  addAuthorExpand() {
    this.addingAuthor = !this.addingAuthor;
  }

  searchAuthor() {
    // Implement search logic here and update searchResults array
    this.authorService.searchAuthorByName(this.searchParam, this.currentPage, this.itemsPerPage).subscribe((authors:Author[])=>{
      this.searchResults = authors;
    })

    this.authorService.getTotalAuthorCount(this.searchParam).subscribe((count:number) => {
      this.totalItems = count;
    });
  }

  addExistingAuthor(author: Author) {
    const authorData = {
      _id: author._id,
      name: author.name,
      key: author.key
    };

    this.bookToAdd.authors.push(authorData);
    
    // this.addingAuthor = false;
  }

  saveChanges(){
    this.bookService.insertBook(this.bookToAdd).subscribe(resp=>{
      if(resp["message"] == "inserted") {
        alert("book inserted")
        this.bookToAdd = new Book();
        this.bookToAdd.authors = [];
      }
      else alert("error in inserting")
    })
  }

  dimensionErrorFlag:boolean = false;
  dimensionErrorMassage:string;

  async onFileChange(event) {
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      const isValidDimensions = await this.dimensionValidator(file);
  
      if (isValidDimensions) {
        this.convertFileToBase64(file).subscribe((base64) => {
          this.bookToAdd.coverData64 = "data:" + file.type + ";base64," + base64;
        });

        if (file) {
          this.bookToAdd.coverContentType64 = file.type;
        }
      }
    }
  }

  async dimensionValidator(file): Promise<boolean> {
    const img = new Image();
    img.src = window.URL.createObjectURL(file);
  
    return new Promise((resolve) => {
      img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
  
        window.URL.revokeObjectURL(img.src);
  
        if (width < 100 || width > 500 || height < 100 || height > 500) {
          this.dimensionErrorMassage = 'Invalid dimensions. Image dimensions should be between 100x100 and 500x500 pixels.';
          this.dimensionErrorFlag = true;
          resolve(false);
        } else {
          this.dimensionErrorMassage = null;
          this.dimensionErrorFlag = false;
          resolve(true);
        }
      };
    });
  }

  convertFileToBase64(file : File) : Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event) => result.next(btoa(event.target.result.toString()));
    return result;
  }
}
