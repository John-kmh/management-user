import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../user.service';
import * as UserActions from './user.actions';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private userService = inject(UserService);

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      mergeMap(() =>
        this.userService.getUsers().pipe(
          map((res) =>
            UserActions.loadUsersSuccess({
              users: res.data.map((item) => ({
                ...item.user,
                roles: item.roles,
                permissions: item.permissions || [],
              })),
            })
          ),
          catchError((error) => of(UserActions.loadUsersFailure({ error })))
        )
      )
    )
  );

 createUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.createUser),
      mergeMap(({ user }) =>
        this.userService.createUser(user).pipe(
          map((newUser) => UserActions.createUserSuccess({ user: newUser })),
          catchError((error) => of(UserActions.createUserFailure({ error })))
        )
      )
    );
  });

  updateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.updateUser),
      mergeMap(({ user }) =>
        this.userService.updateUser(user).pipe(
          map((updatedUser) =>
            UserActions.updateUserSuccess({ user: updatedUser })
          ),
          catchError((error) =>
            of(UserActions.updateUserFailure({ error: error.message }))
          )
        )
      )
    );
  });

  deleteUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.deleteUser),
      mergeMap(({ id }) =>
        this.userService.deleteUser(id).pipe(
          map(() => UserActions.deleteUserSuccess({ id })),
          catchError((error) => of(UserActions.deleteUserFailure({ error })))
        )
      )
    );
  });
}

// export const updateUser$ = createEffect(() => {
//   const actions$ = inject(Actions);
//   const service = inject(UserService);

//   return actions$.pipe(
//     ofType(UserActions.updateUser),
//     mergeMap(({ id, user }) =>
//       service.updateUser(id, user).pipe(
//         map(() => UserActions.updateUserSuccess({ user })),
//         catchError((error) => of(UserActions.updateUserFailure({ error })))
//       )
//     )
//   );
// });
