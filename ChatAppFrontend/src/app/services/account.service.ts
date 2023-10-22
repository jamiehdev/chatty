import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private readonly apiUrl = 'http://localhost:5266/api/accounts';

  constructor(private readonly http: HttpClient) {}

  public createAccount(username: string, password: string): any {
    const body = { username, password };
    return this.http.post(`${this.apiUrl}/create`, body);
  }

  public loginAccount(username: string, password: string): Observable<string> {
    const body = { username, password };
    return this.http.post(`${this.apiUrl}/login`, body, { responseType: 'text' });
  }
}
