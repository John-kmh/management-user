import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { initialState } from './user.state';



export const userReducer = createReducer(
  initialState,

  // Load all
  on(UserActions.loadUsers, state => ({ ...state, loading: true })),
  on(UserActions.loadUsersSuccess, (state, { users }) => ({
    ...state, users, loading: false
  })),
  on(UserActions.loadUsersFailure, (state, { error }) => ({
    ...state, loading: false, error
  })),

  // Load by id
  on(UserActions.loadUser, state => ({ ...state, loading: true })),
  on(UserActions.loadUserSuccess, (state, { user }) => ({
    ...state, selectedUser: user, loading: false
  })),
  on(UserActions.loadUserFailure, (state, { error }) => ({
    ...state, loading: false, error
  })),

  // Create
  on(UserActions.createUserSuccess, (state, { user }) => ({
    ...state, users: [...state.users, user]
  })),

  // Update
  on(UserActions.updateUserSuccess, (state, { user }) => ({
    ...state,
    users: state.users.map(u => u.user_id === user.user_id ? user : u)
  })),

  // Delete
  on(UserActions.deleteUserSuccess, (state, { id }) => ({
    ...state,
    users: state.users.filter(u => u.user_id !== id)
  }))
);
