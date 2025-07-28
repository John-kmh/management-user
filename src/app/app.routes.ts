import { Routes } from '@angular/router';
// import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth-routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: '',
    loadChildren: () =>
      import('./features/modules/module-routes').then((m) => m.MODULE_ROUTES),
    // canActivate: [authGuard], // protect dashboard route with the authGuard
  },

  // Default redirect
  { path: '', redirectTo: '', pathMatch: 'full' },

  {
    path: '**',
    loadComponent: () =>
      import('./layout/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
];
