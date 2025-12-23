import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/components/home-page/home-page').then((c) => c.HomePage),
    title: 'Home',
  },
  {
    path: 'sign-in',
    loadComponent: () => import('./auth/components/sign-in-page/sign-in-page').then((c) => c.SignInPage),
    title: 'Sign In',
  },
  {
    path: 'verify-email',
    loadComponent: () => import('./auth/components/verify-email-page/verify-email-page').then((c) => c.VerifyEmailPage),
    title: 'Verify Email',
  }
  //need a route for complete your profile page when signing in with google
  //need a route for sign-up
  //need a route for password reset
  //need a route for profile page
  //need a 404 page
];
