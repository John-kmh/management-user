import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

// Feature selector for the 'auth' slice
export const selectAuthState = createFeatureSelector<AuthState>('auth');

// Selector to get the auth user
export const selectAuthUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);

// Selector to get the auth token
export const selectAuthToken = createSelector(
  selectAuthState,
  (state: AuthState) => state.token
);

export const selectAuthLoading = createSelector(
  selectAuthState,
  (state) => state.loading
);

// --- ADD THIS NEW SELECTOR ---
export const selectAuthError = createSelector(
  selectAuthState,
  (state: AuthState) => state.error
);
