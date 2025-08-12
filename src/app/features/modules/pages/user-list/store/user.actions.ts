import { createAction, props } from '@ngrx/store';
import { FlatUser, User, UserApiResponse } from '../../../models/user.model';

//Load Users
export const loadUsers = createAction('[User] Load Users');
export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ users: FlatUser[] }>()
);
export const loadUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: any }>()
);

//Load One User
export const loadUser = createAction(
  '[User] Load User',
  props<{ id: number }>()
);
export const loadUserSuccess = createAction(
  '[User] Load User Success',
  props<{ user: UserApiResponse }>()
);
export const loadUserFailure = createAction(
  '[User] Load User Failure',
  props<{ error: any }>()
);

//Create User
export const createUser = createAction(
  '[User] Create User',
  props<{
    user: Omit<User, 'user_id'>;
    roles: string[];
    permissions?: string[];
  }>()
);
export const createUserSuccess = createAction(
  '[User] Create User Success',
  props<{ user: FlatUser }>()
);
export const createUserFailure = createAction(
  '[User] Create User Failure',
  props<{ error: any }>()
);

//Update User
export const updateUser = createAction(
  '[User] Update User',
  props<{ user: User; roles: string[]; permissions?: string[] }>()
);
export const updateUserSuccess = createAction(
  '[User] Update User Success',
  props<{ user: FlatUser }>()
);
export const updateUserFailure = createAction(
  '[User] Update User Failure',
  props<{ error: any }>()
);

//Delete User
export const deleteUser = createAction(
  '[User] Delete User',
  props<{ id: number }>()
);
export const deleteUserSuccess = createAction(
  '[User] Delete User Success',
  props<{ id: number }>()
);
export const deleteUserFailure = createAction(
  '[User] Delete User Failure',
  props<{ error: any }>()
);
