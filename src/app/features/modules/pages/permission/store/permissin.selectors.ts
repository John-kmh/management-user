import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PermissionsState } from './permission.state';

export const selectPermissionsState = createFeatureSelector<PermissionsState>('permissions');

export const selectAllPermissions = createSelector(
  selectPermissionsState,
  (state) => state.permissions
);

export const selectPermissionsLoading = createSelector(
  selectPermissionsState,
  (state) => state.loading
);

export const selectPermissionsError = createSelector(
  selectPermissionsState,
  (state) => state.error
);
