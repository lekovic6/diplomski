import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { RegistrationComponent } from './registration/registration.component';
import { CategorySearchPageComponent } from './category-search-page/category-search-page.component';
import { SearchPageComponent } from './search-page/search-page.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'searchPage/:searchParam', component:SearchPageComponent},
  {path: 'categorySearchPage/:categoryName', component:CategorySearchPageComponent},

  {path: 'registration', component:RegistrationComponent},
  {path: 'loginUser', component:LoginUserComponent},
  {path: 'loginAdmin', component:LoginAdminComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
