import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.state';

// 1️⃣ Select the whole feature state
export const selectUserState = createFeatureSelector<UserState>('users');

// 2️⃣ Select the full users list
export const selectAllUsers = createSelector(
  selectUserState,
  (state) => state.users // array of { user, roles, permissions }
);

// 3️⃣ Select loading status
export const selectUsersLoading = createSelector(
  selectUserState,
  (state) => state.loading
);

// 4️⃣ Select error (if any)
export const selectUsersError = createSelector(
  selectUserState,
  (state) => state.error
);

// 5️⃣ Select single user detail by ID
export const selectUserById = (id: number) =>
  createSelector(
    selectAllUsers,
    (users) => users.find((u) => u.user_id === id) || null
  );
