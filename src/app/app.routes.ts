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
  {
    path: 'fav',
    loadComponent: () => import('./screens/fav/fav.page').then( m => m.FavPage)
  },
  {
    path: 'passo1',
    loadComponent: () => import('./screens/finish-shoping/passo1/passo1.page').then( m => m.Passo1Page)
  },
  {
    path: 'passo2',
    loadComponent: () => import('./screens/finish-shoping/passo2/passo2.page').then( m => m.Passo2Page)
  },
  {
    path: 'passo3',
    loadComponent: () => import('./screens/finish-shoping/passo3/passo3.page').then( m => m.Passo3Page)
  },
  {
    path: 'passo4',
    loadComponent: () => import('./screens/finish-shoping/passo4/passo4.page').then( m => m.Passo4Page)
  },
  {
    path: 'passo5',
    loadComponent: () => import('./screens/finish-shoping/passo5/passo5.page').then( m => m.Passo5Page)
  },
  {
    path: 'final',
    loadComponent: () => import('./screens/finish-shoping/final/final.page').then( m => m.FinalPage)
  },
];
