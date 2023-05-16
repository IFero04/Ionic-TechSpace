import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./screens/tabs/tabs.routes').then((m) => m.routes),
  },
];
