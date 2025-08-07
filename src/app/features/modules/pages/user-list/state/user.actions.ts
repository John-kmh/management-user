import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User, UserResponseItem } from '../../../models/user.model';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Load Users': emptyProps(),
    'Load Users Success': props<{ users: UserResponseItem[] }>(),
    'Load Users Failure': props<{ error: any }>(),

    'Load User': props<{ id: number }>(),
    'Load User Success': props<{ user: UserResponseItem }>(),
    'Load User Failure': props<{ error: any }>(),

    
    'Create User': props<{ user: User }>(),
    'Create User Success': props<{ user: UserResponseItem }>(),
    'Create User Failure': props<{ error: any }>(),

    'Update User': props<{ id: number; user: User }>(),
    'Update User Success': props<{ user: UserResponseItem }>(),
    'Update User Failure': props<{ error: any }>(),

    'Delete User': props<{ id: number }>(),
    'Delete User Success': props<{ id: number }>(),
    'Delete User Failure': props<{ error: any }>(),
  },
});

