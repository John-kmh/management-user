import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserActions } from './user.actions';
import { UserService } from '../user.service';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { User } from '../../../models/user.model';

@Injectable()
export class UserEffects {
  private action$ = inject(Actions);
  private userService = inject(UserService);

  loadTeams$ = createEffect(() =>
    this.action$.pipe(
      ofType(UserActions.loadUsers),
      switchMap(() =>
        this.userService.getUsers().pipe(
          map((res) => UserActions.loadUsersSuccess({ users: res.data })),

          catchError((error) => of(UserActions.loadUserFailure({ error })))
        )
      )
    )
  );

  createUser$ = createEffect(() =>
    this.action$.pipe(
      ofType(UserActions.createUser),
      mergeMap(({ user }) =>
        this.userService.createUser(user).pipe(
          map((newUser) =>
            UserActions.createUserSuccess({
              user: newUser,
            })
          ),
          catchError((error) => of(UserActions.createUserFailure({ error })))
        )
      )
    )
  );

  deleteUser$ = createEffect(() => {
    return this.action$.pipe(
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
