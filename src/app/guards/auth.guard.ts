import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuth()) {
    if (isTokenExpired()) {
      router.navigate(['login']);
      return false;
    }

    if (!authService.isAdmin()) {
      router.navigate(['/forbidden']);
      return false;
    }
    return true;
  }
  router.navigate(['login']);
  return false;
};

const isTokenExpired = () => {
  const authService = inject(AuthService);

  const token = authService.token;
  const payload = authService.getPayLoad(token);

  const exp = payload.exp;
  const now = new Date().getTime() / 1000;

  return now > exp ? true : false;
};
