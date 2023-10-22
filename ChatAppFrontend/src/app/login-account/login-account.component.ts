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
  loginSuccess: string = '';
  loginError: string = '';

  constructor(private readonly fb: FormBuilder, private readonly accountsService: AccountService, private readonly router: Router, private readonly authService: AuthService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;

      this.accountsService.loginAccount(username, password).subscribe({
        next: response => {
          this.loginSuccess = 'Successfully logged in!';
          this.loginError = '';

          this.authService.login(response);
          setTimeout(() => {
            this.router.navigate(['/']).then(success => {
              if (!success) {
                console.log('Navigation failed');
              }
            }).catch(error => {
              console.error('Navigation error', error);
            });
          }, 5000);
        },
        error: error => {
          console.error('Login error', error);

          try {
            const errorObject = JSON.parse(error.error);
            this.loginError = errorObject.message ?? 'An unknown error occurred';
          } catch {
            this.loginError = 'An unknown error occurred';
          }

          this.loginSuccess = '';
        }
      });
    }
  }
}
