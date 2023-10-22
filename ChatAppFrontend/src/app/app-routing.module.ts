import { NgModule } from '@angular/core';
import { RouterModule, type Routes } from '@angular/router';
import { CreateAccountComponent } from './create-account/create-account.component';
import { LoginAccountComponent } from './login-account/login-account.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'create-account',
    component: CreateAccountComponent,
    canActivate: [authGuard]
  },
  {
    path: 'login-account',
    component: LoginAccountComponent,
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
