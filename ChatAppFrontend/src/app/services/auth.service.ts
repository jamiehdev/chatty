import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

const TOKEN_KEY = 'token';
const USERNAME_CLAIM = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private readonly jwtHelper: JwtHelperService) {}

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');

    return !this.jwtHelper.isTokenExpired(token);
  }

  login(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
  }

  getUsername(): string | null {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token === null || token === '') return null;
    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken?.[USERNAME_CLAIM] ?? null;
  }
}
