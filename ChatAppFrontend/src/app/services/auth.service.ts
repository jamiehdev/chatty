import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USER_KEY = 'user';

  // Simulate user login
  login (username: string): void {
    sessionStorage.setItem(this.USER_KEY, username);
  }

  // Simulate user logout
  logout (): void {
    sessionStorage.removeItem(this.USER_KEY);
  }

  // Check if the user is logged in
  isLoggedIn (): boolean {
    return !(sessionStorage.getItem(this.USER_KEY) == null);
  }

  // Get the username of the logged-in user
  getUsername (): string | null {
    return sessionStorage.getItem(this.USER_KEY);
  }
}
