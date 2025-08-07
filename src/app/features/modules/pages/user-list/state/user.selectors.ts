import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

const selectUserState = createFeatureSelector<UserState>('users');

export const selectAllUsers = createSelector(
  selectUserState,
  state => state.users
);

export const selectSelectedUser = createSelector(
  selectUserState,
  state => state.selectedUser
);

export const selectUserLoading = createSelector(
  selectUserState,
  state => state.loading
);
