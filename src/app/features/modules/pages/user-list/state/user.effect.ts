import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserActions } from './user.actions';
import { UserService } from '../user.service';
import { catchError, map, mergeMap, of } from 'rxjs';
import { User, UserResponseItem } from '../../../models/user.model';

@Injectable()
export class UserEffects {
  private action$ = inject(Actions);
  private userService = inject(UserService);

  loadUsers$ = createEffect(() => {
    return this.action$.pipe(
      ofType(UserActions.loadUsers),
      mergeMap(() =>
        this.userService.getUsers().pipe(
          // Normalize the response here
          map((response: UserResponseItem[]) =>
            UserActions.loadUsersSuccess({ users: response })
          ),
          catchError((error) => of(UserActions.loadUsersFailure({ error })))
        )
      )
    );
  });

  loadUser$ = createEffect(() => {
    return this.action$.pipe(
      ofType(UserActions.loadUser),
      mergeMap(({ id }) =>
        this.userService.getUserById(id).pipe(
          map((res: User) => {
            const userResponse: UserResponseItem = {
              user: res,
              roles: [], // add real roles if you have them
              permissions: [], // add real permissions if you have them
            };
            return UserActions.loadUserSuccess({ user: userResponse });
          }),
          catchError((error) => of(UserActions.loadUserFailure({ error })))
        )
      )
    );
  });

  createUser$ = createEffect(() => {
    return this.action$.pipe(
      ofType(UserActions.createUser),
      mergeMap(({ user }) =>
        this.userService.createUser(user).pipe(
          map((res) => {
            const userResponse: UserResponseItem = {
              user: res.data.user,
              roles: res.data.roles ?? [], // use actual roles if available
              permissions: res.data.permissions ?? [], // use actual permissions if available
            };
            return UserActions.createUserSuccess({ user: userResponse });
          }),
          catchError((error) => of(UserActions.createUserFailure({ error })))
        )
      )
    );
  });

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
