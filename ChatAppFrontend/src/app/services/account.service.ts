import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private readonly apiUrl = 'http://localhost:5266/api/accounts';

  constructor (private readonly http: HttpClient) {}

  public createAccount (username: string, password: string): any {
    const body = { username, password };
    return this.http.post(`${this.apiUrl}/create`, body);
  }

  public loginAccount (username: string, password: string): any {
    const body = { username, password };
    return this.http.post(`${this.apiUrl}/login`, body);
  }

  // Add other account-related methods here as needed
}
