import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { routes } from './app.routes';

// Your core services and interceptor
import { AuthService } from './core/services/auth.service';
import { LoggerService } from './core/services/logger.service';
import { provideStore } from '@ngrx/store';
import { authReducer } from './features/auth/state/auth.reducer';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './features/auth/state/auth.effects';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    // Enable change detection optimization
    provideZoneChangeDetection({ eventCoalescing: true }),

    // HTTP client with DI-based interceptors
    provideHttpClient(withInterceptorsFromDi()),

    // Services (optional if already using providedIn: 'root')
    AuthService,
    LoggerService,

    // HTTP Interceptor
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },

    // Router
    provideRouter(routes),

    // Ngrnx
    provideStore({
      auth: authReducer,
    }),
    provideEffects([AuthEffects]),

    // toastr
    // importProvidersFrom(
    //   ToastrModule.forRoot({
    //     timeOut: 5000,
    //     positionClass: 'toast-bottom-right',
    //     preventDuplicates: true,
    //   })
    // ),
  ],
};
