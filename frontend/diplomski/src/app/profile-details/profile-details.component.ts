import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { LoginService } from '../services/login.service';
import { User } from '../models/user';
import { Observable, ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent {

  username: String;
  user: User;

  constructor(private userService: UserService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.username = this.loginService.getUser().username;

    this.userService.getUserByUsername(this.username).subscribe((user: User) => {
      this.user = user;
    });


  }

  updateDetails() {
    this.userService.updateUserDetails(this.user).subscribe(res => {
      if (res['message'] = 'updated') alert('Details updated!');
      else alert('Update failed');
    });
  }



  dimensionErrorFlag: boolean = false;
  dimensionErrorMassage: string;

  async onFileChange(event) {
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      const isValidDimensions = await this.dimensionValidator(file);

      if (isValidDimensions) {
        this.convertFileToBase64(file).subscribe((base64) => {
          this.user.profilePicture.data = base64;
        });

        if (file) {
          this.user.profilePicture.contentType = file.type;
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
