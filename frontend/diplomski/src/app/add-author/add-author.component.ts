import { Component } from '@angular/core';
import { BookService } from '../services/book.service';
import { AuthorService } from '../services/author.service';
import { Author } from '../models/author';
import { Observable, ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.css']
})
export class AddAuthorComponent {

  constructor(private bookService: BookService, private authorService: AuthorService) {
    this.authorToAdd.links = [];
  }

  ngOnInit(): void {

  }

  authorToAdd: Author = new Author();

  // Add a new link
  addLink() {
    this.authorToAdd.links.push({ title: '', url: '', type: { key: '/type/link' } });
  }

  // Remove a link
  removeLink(index: number) {
    this.authorToAdd.links.splice(index, 1);
  }

  insertAuthor() {
    this.authorService.insertAuthor(this.authorToAdd).subscribe(resp => {
      if (resp["message"] == "inserted") {
        alert("author inserted")
        this.authorToAdd = new Author();
        this.authorToAdd.links = [];
      }
      else alert("error in inserting")
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
          this.authorToAdd.coverData64 = "data:" + file.type + ";base64," + base64;
        });

        if (file) {
          this.authorToAdd.coverContentType64 = file.type;
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
