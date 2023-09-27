import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  private isOnCreateOrLoginPageSubject = new BehaviorSubject<boolean>(false);

  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  isOnCreateOrLoginPage$ = this.isOnCreateOrLoginPageSubject.asObservable();

  constructor(private authService: AuthService, private router: Router) {
    this.updateState();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateState();
    });
  }

  private updateState(): void {
    this.isLoggedInSubject.next(this.authService.isLoggedIn());
    this.isOnCreateOrLoginPageSubject.next(this.checkIfOnCreateOrLoginPage());
  }

  private checkIfOnCreateOrLoginPage(): boolean {
    return ['/create-account', '/login-account'].includes(this.router.url);
  }
}
