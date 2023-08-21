import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { RegistrationComponent } from './registration/registration.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BookDetailsComponent } from './book-details/book-details.component';
import { CategorySearchPageComponent } from './category-search-page/category-search-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { AuthorDetailsComponent } from './author-details/author-details.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { EditBookDetailsComponent } from './edit-book-details/edit-book-details.component';
import { EditAuthorDetailsComponent } from './edit-author-details/edit-author-details.component';
import { AddBookComponent } from './add-book/add-book.component';
import { AddAuthorComponent } from './add-author/add-author.component';
import { MyListComponent } from './my-list/my-list.component';
import { PendingReviewsComponent } from './pending-reviews/pending-reviews.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AllUsersComponent } from './all-users/all-users.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginUserComponent,
    LoginAdminComponent,
    RegistrationComponent,
    HeaderComponent,
    FooterComponent,
    BookDetailsComponent,
    CategorySearchPageComponent,
    SearchPageComponent,
    AuthorDetailsComponent,
    EditBookDetailsComponent,
    EditAuthorDetailsComponent,
    AddBookComponent,
    AddAuthorComponent,
    MyListComponent,
    PendingReviewsComponent,
    ProfileDetailsComponent,
    ChangePasswordComponent,
    AllUsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
