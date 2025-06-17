import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./home/home.page').then((m) => m.HomePage) },
  { path: 'home', loadComponent: () => import('./pages/home/home.modules').then((m) => m.HomePageModules) },
  { path: 'details/:name', loadComponent: () => import('./pages/details/details.modules').then((m) => m.DetailsPageModules) }
];