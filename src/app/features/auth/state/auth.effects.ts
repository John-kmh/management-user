import { inject, Injectable } from '@angular/core';
import { catchError, exhaustMap, map, mergeMap, of, tap } from 'rxjs';
import { AuthResponse, AuthService } from '../../../core/services/auth.service';
import { AuthActions } from './auth.actions';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private router = inject(Router);
  private authService = inject(AuthService);
  // private toastr = inject(ToastrService);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap((action) =>
        this.authService.login(action.credentials).pipe(
          mergeMap((authResponse) => {
            // Check if the response indicates a true success (e.g., it has a token)
            if (authResponse && authResponse.access_token) {
              return of(AuthActions.loginSuccess({ authResponse }));
            } else {
              // If there's no token, treat it as a failure
              const errorMessage =
                (authResponse as any)?.error_description ||
                'Invalid credentials or server response.';
              return of(AuthActions.loginFailure({ error: errorMessage }));
            }
          }),
          catchError((error: any) => {
            const errorMessage =
              error?.error?.error_description || 'An unknown error occurred.';
            return of(AuthActions.loginFailure({ error: errorMessage }));
          })
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(({ authResponse }) => {
          localStorage.setItem('access_token', authResponse.access_token);
          this.router.navigate(['/module']);
        })
      ),
    { dispatch: false }
  );

  loginFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginFailure),
        tap(({ error }) => {
          // this.toastr.error(error, 'Login Failed');
          alert(error);
        })
      ),
    { dispatch: false }
  );

  init$ = createEffect(() => {
    if (this.authService.isLoggedIn()) {
      const token = this.authService.getToken()!;
      return of(AuthActions.restoreSession({ token }));
    }
    return of(AuthActions.logout());
  });

  // logout$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(AuthActions.logout),
  //       tap(() => {
  //         this.authService.logout();
  //         this.router.navigate(['auth/login']);
  //       })
  //     ),
  //   { dispatch: false }
  // );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        exhaustMap(() =>
          this.authService.logout().pipe(
            tap(() => {
              this.router.navigate(['auth/login']);
            })
          )
        )
      ),
    { dispatch: false }
  );
}
