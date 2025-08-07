import { createReducer, on } from '@ngrx/store';
import { UserActions } from './user.actions';
import { User, UserResponseItem } from '../../../models/user.model';

export interface UserState {
  users: UserResponseItem[];
  selectedUser: UserResponseItem | null;
  loading: boolean;
  error: any;
}

export const initialUserState: UserState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
};

export const userReducer = createReducer(
  initialUserState,

  // Load All
  on(UserActions.loadUsers, (state) => ({ ...state, loading: true })),
  on(UserActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    loading: false,
    users,
  })),
  on(UserActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Load One
  on(UserActions.loadUser, (state) => ({ ...state, loading: true })),
  on(UserActions.loadUserSuccess, (state, { user }) => ({
    ...state,
    selectedUser: user,
    loading: false,
  })),
  on(UserActions.loadUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Create
  on(UserActions.createUser, (state) => ({ ...state, loading: true })),
  on(UserActions.createUserSuccess, (state, { user }) => ({
    ...state,
    users: [...state.users, user],
    loading: false,
  })),
  on(UserActions.createUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Update
  on(UserActions.updateUser, (state) => ({ ...state, loading: true })),
  on(UserActions.updateUserSuccess, (state, { user }) => ({
    ...state,
    users: state.users.map((u) =>
      u.user.user_id === user.user.user_id ? user : u
    ),
    loading: false,
  })),
  on(UserActions.updateUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Delete
  on(UserActions.deleteUser, (state) => ({ ...state, loading: true })),
  on(UserActions.deleteUserSuccess, (state, { id }) => ({
    ...state,
    users: state.users.filter((u) => u.user.user_id !== id),
    loading: false,
  })),
  on(UserActions.deleteUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

