import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User, UserItemResponse } from '../../../models/user.model';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Load Users': emptyProps(),
    'Load Users Success': props<{ users: User[] }>(),
    'Load Users Failure': props<{ error: any }>(),

    'Load User': props<{ id: number }>(),
    'Load User Success': props<{ user: User }>(),
    'Load User Failure': props<{ error: any }>(),

    'Create User': props<{ user: Omit<User, 'user_id'> }>(),
    'Create User Success': props<{ user: User }>(),
    'Create User Failure': props<{ error: any }>(),

    'Update User': props<{ user: User }>(),
    'Update User Success': props<{ user: User }>(),
    'Update User Failure': props<{ error: any }>(),

    'Delete User': props<{ id: number }>(),
    'Delete User Success': props<{ id: number }>(),
    'Delete User Failure': props<{ error: any }>(),
  },
});
