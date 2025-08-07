import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpInterceptor,
} from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable, switchMap, take, catchError, throwError } from 'rxjs';
import { selectAuthToken } from '../../features/auth/state/auth.selectors';
import { Router } from '@angular/router';
import { AuthActions } from '../../features/auth/state/auth.actions';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private store = inject(Store);
  private router = inject(Router);

  // intercept(
  //   req: HttpRequest<any>,
  //   next: HttpHandler
  // ): Observable<HttpEvent<any>> {
  //   return this.store.select(selectAuthToken).pipe(
  //     take(1),
  //     switchMap((token) => {
  //       let clonedReq = req;
  //       if (token) {
  //         clonedReq = req.clone({
  //           setHeaders: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         });
  //       }

  //       // Handle the request and catch errors
  //       return next.handle(clonedReq).pipe(
  //         catchError((error: HttpErrorResponse) => {
  //           // If the error is 401 (Unauthorized), log out and redirect
  //           if (error.status === 401) {
  //             this.store.dispatch(AuthActions.logout());
  //             this.router.navigate(['/auth/login']);
  //           }
  //           // Re-throw the error for other handlers
  //           return throwError(() => error);
  //         })
  //       );
  //     })
  //   );
  // }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select(selectAuthToken).pipe(
      take(1),
      switchMap((token) => {
        const teamId = '1';

        let headers = req.headers;

        if (token) {
          headers = headers.set('Authorization', `Bearer ${token}`);
        }

        if (teamId) {
          headers = headers.set('X-Team-Id', teamId);
        }

        const clonedReq = req.clone({ headers });

        return next.handle(clonedReq).pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
              this.store.dispatch(AuthActions.logout());
              this.router.navigate(['/auth/login']);
            }
            return throwError(() => error);
          })
        );
      })
    );
  }
}
