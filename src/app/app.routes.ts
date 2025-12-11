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
];
