import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { RegistrationComponent } from './registration/registration.component';
import { CategorySearchPageComponent } from './category-search-page/category-search-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { AuthorDetailsComponent } from './author-details/author-details.component';
import { EditBookDetailsComponent } from './edit-book-details/edit-book-details.component';
import { EditAuthorDetailsComponent } from './edit-author-details/edit-author-details.component';
import { AddBookComponent } from './add-book/add-book.component';
import { AddAuthorComponent } from './add-author/add-author.component';
import { MyListComponent } from './my-list/my-list.component';
import { PendingReviewsComponent } from './pending-reviews/pending-reviews.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AllUsersComponent } from './all-users/all-users.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'searchPage/:searchParam', component:SearchPageComponent},
  {path: 'categorySearchPage/:categoryName', component:CategorySearchPageComponent},

  {path: 'registration', component:RegistrationComponent},
  {path: 'loginUser', component:LoginUserComponent},
  {path: 'loginAdmin', component:LoginAdminComponent},

  {path: 'bookDetails/:bookId', component:BookDetailsComponent},
  {path: 'authorDetails/:authorId', component:AuthorDetailsComponent},

  {path: 'editBookDetails/:bookId', component:EditBookDetailsComponent},
  {path: 'editAuthorDetails/:authorId', component:EditAuthorDetailsComponent},
  {path: 'addBook', component:AddBookComponent},
  {path: 'addAuthor', component:AddAuthorComponent},
  
  {path: 'myList', component:MyListComponent},
  {path: 'pendingReviews', component:PendingReviewsComponent},
  
  {path: 'profileDetails', component:ProfileDetailsComponent},
  {path: 'changePassword', component:ChangePasswordComponent},

  {path: 'allUsers', component:AllUsersComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
