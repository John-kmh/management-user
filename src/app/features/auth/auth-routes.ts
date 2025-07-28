import { Route } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ForgotPassowrdPageComponent } from './pages/forgot-passowrd-page/forgot-passowrd-page.component';

export const AUTH_ROUTES: Route[] = [
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPassowrdPageComponent,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
