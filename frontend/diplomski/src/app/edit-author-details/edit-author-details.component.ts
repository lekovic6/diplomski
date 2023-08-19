import { Component } from '@angular/core';
import { BookService } from '../services/book.service';
import { AuthorService } from '../services/author.service';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../services/login.service';
import { Book } from '../models/book';
import { Author } from '../models/author';
import { Observable, ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-edit-author-details',
  templateUrl: './edit-author-details.component.html',
  styleUrls: ['./edit-author-details.component.css']
})
export class EditAuthorDetailsComponent {

  constructor(private bookService: BookService, private authorService: AuthorService, private route: ActivatedRoute, private loginService: LoginService) { }

  authorId: String = "";
  authorToShow: Author = null;
  authorsWorks: Book[] = [];


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.authorId = params['authorId'];

      this.authorService.getAuthorById(this.authorId).subscribe((author: Author) => {
        this.authorToShow = author;
      })

      this.bookService.getAllBooksByAuthorsId(this.authorId).subscribe((books: Book[]) => {
        this.authorsWorks = books;
      })

    })

  }


  itemsPerPage: number = 5;
  totalItems: number;
  currentPage: number = 1;


  // Add a new link
  addLink() {
    this.authorToShow.links.push({ title: '', url: '', type: { key: '/type/link' } });
  }

  // Remove a link
  removeLink(index: number) {
    this.authorToShow.links.splice(index, 1);
  }

  saveChanges() {
    this.authorService.updateAuthor(this.authorToShow).subscribe(resp => {
      if (resp["message"] == "updated") {
        alert("author updated")
        window.location.reload();
      }
      else alert("error in updating")
    })
  }

  dimensionErrorFlag: boolean = false;
  dimensionErrorMassage: string;

  async onFileChange(event) {
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      const isValidDimensions = await this.dimensionValidator(file);

      if (isValidDimensions) {
        this.convertFileToBase64(file).subscribe((base64) => {
          this.authorToShow.coverData64 = "data:" + file.type + ";base64," + base64;
        });

        if (file) {
          this.authorToShow.coverContentType64 = file.type;
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

  convertFileToBase64(file: File): Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event) => result.next(btoa(event.target.result.toString()));
    return result;
  }


}
