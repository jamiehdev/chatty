/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { StateService } from '../services/state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent {
  accountForm: FormGroup;
  loginError: string = '';
  loginSuccess: string = '';

  constructor (private readonly router: Router, private readonly fb: FormBuilder, private readonly accountService: AccountService, public stateService: StateService) {
    this.accountForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordsMatch });
  }

  passwordsMatch (group: FormGroup): Record<string, boolean> | null {
    const passwordControl = group.get('password');
    const confirmPasswordControl = group.get('confirmPassword');

    if (passwordControl !== null && confirmPasswordControl !== null) {
      if (passwordControl.value !== confirmPasswordControl.value) {
        return { mismatch: true };
      }
    }
    return null;
  }

  onSubmit (): void {
    this.loginError = '';
    this.loginSuccess = '';

    console.log(this.accountForm);

    if (this.accountForm.valid) {
      const username = this.accountForm.get('username')?.value;
      const password = this.accountForm.get('password')?.value;
      this.accountService.createAccount(username, password).subscribe(
        async (response: any) => {
          console.log('Account created:', response);
          this.loginSuccess = response.message;

          // wait for 5 seconds before redirecting
          await new Promise(resolve => setTimeout(resolve, 5000));

          // redirect to login page
          await this.router.navigate(['/login-account']);
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
