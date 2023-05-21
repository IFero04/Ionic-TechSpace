import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./screens/tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'login',
    loadComponent: () => import('./screens/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./screens/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'morada',
    loadComponent: () => import('./screens/morada/morada.page').then( m => m.MoradaPage)
  },
];
