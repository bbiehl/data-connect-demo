import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from './auth.store';

export const authGuard: CanActivateFn = (route, state) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  const canActivate =
    !!authStore.authenticatedUser() && !authStore.authenticatedUser()?.emailVerified;

  if (canActivate) {
    return true;
  } else {
    return router.parseUrl('/');
  }
};
