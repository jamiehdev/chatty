/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent {
  accountForm: FormGroup;
  loginError: string = '';
  loginSuccess: string = '';

  constructor (private readonly fb: FormBuilder, private readonly accountService: AccountService) {
    this.accountForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit (): void {
    this.loginError = '';
    this.loginSuccess = ''; // Reset this on every submit

    if (this.accountForm.valid) {
      const username = this.accountForm.get('username')?.value;
      const password = this.accountForm.get('password')?.value;
      this.accountService.createAccount(username, password).subscribe(
        (response: any) => {
          console.log('Account created:', response);
          this.loginSuccess = response.message; // Update this line
        },
        (error: any) => {
          console.log(error);
          if (error.status === 400) {
            this.loginError = error.error.message;
          }
        }
      );
    }
  }
}
