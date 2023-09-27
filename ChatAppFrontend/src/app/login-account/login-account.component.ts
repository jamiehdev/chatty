/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login-account.component.html',
  styleUrls: ['./login-account.component.scss']
})
export class LoginAccountComponent implements OnInit {
  loginForm: FormGroup;
  loginSuccess: string | null = null;
  loginError: string | null = null;

  constructor (private readonly fb: FormBuilder, private readonly accountsService: AccountService, private readonly router: Router, private readonly authService: AuthService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit (): void {
  }

  async onSubmit (): Promise<void> {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;

      try {
        const response = await this.accountsService.loginAccount(username, password).toPromise();

        console.log('Login successful', response);
        this.loginSuccess = response.message;
        this.loginError = null;

        this.authService.login(username);

        await new Promise(resolve => setTimeout(resolve, 5000));

        await this.router.navigate(['/']);
      } catch (error) {
        console.error('Login error', error);

        // Type checking or type assertion to access properties safely
        if (error instanceof Error) {
          this.loginError = error.message;
        } else if (typeof error === 'object' && error !== null) {
          // Assuming error is an object with a property 'error' which itself has a property 'message'
          this.loginError = (error as { error: { message: string } }).error.message;
        } else {
          this.loginError = 'An unknown error occurred';
        }

        this.loginSuccess = null;
      }
    }
  }
}
