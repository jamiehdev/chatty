import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isTokenValid = authService.isAuthenticated();

  // if the token is valid and the user is trying to access login or create account pages,
  // redirect them to the dashboard page.
  if (isTokenValid && (state.url === '/login-account' || state.url === '/create-account')) {
    await router.navigate(['/']);
    return false;
  }

  // allow access to the current route.
  return true;
};
