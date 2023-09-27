import { NgModule } from '@angular/core';
import { RouterModule, type Routes } from '@angular/router';
import { CreateAccountComponent } from './create-account/create-account.component';
import { LoginAccountComponent } from './login-account/login-account.component';

const routes: Routes = [
  {
    path: 'create-account',
    component: CreateAccountComponent
  },
  {
    path: 'login-account',
    component: LoginAccountComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
