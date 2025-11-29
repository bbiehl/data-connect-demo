import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./home/components/home-page/home-page').then(m => m.HomePage),
        title: 'Home'
    }
];
