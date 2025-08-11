import { createReducer, on } from '@ngrx/store';
import { UserActions } from './user.actions';
import { initialUserState } from './user.state';

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

  // Load One user
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
  on(UserActions.createUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(UserActions.createUserSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    users: [...state.users, user],
  })),
  on(UserActions.createUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Update
  on(UserActions.updateUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(UserActions.updateUserSuccess, (state, { user }) => ({
    ...state,
    users: state.users.map((t) => (t.user_id === user.user_id ? user : t)),
    loading: false,
  })),
  on(UserActions.updateUserFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  // Delete
  on(UserActions.deleteUser, (state) => ({ ...state, loading: true })),
  on(UserActions.deleteUserSuccess, (state, { id }) => ({
    ...state,
    users: state.users.filter((u) => u.user_id !== id),
    loading: false,
  }))
  // on(UserActions.deleteUser, (state) => ({ ...state, loading: true })),
  // on(UserActions.deleteUserSuccess, (state, { id }) => ({
  //   ...state,
  //   users: state.users.filter((u) => u.user.user_id !== id),
  //   loading: false,
  // })),
  // on(UserActions.deleteUserFailure, (state, { error }) => ({
  //   ...state,
  //   loading: false,
  //   error,
  // }))
);
