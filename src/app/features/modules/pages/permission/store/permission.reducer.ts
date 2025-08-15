import { createReducer, on } from '@ngrx/store';
import { initialPermissionState } from './permission.state';
import * as PermissionsActions from './permission.actions';

export const permissionsReducer = createReducer(
  initialPermissionState,
  // Load All
  on(PermissionsActions.loadPermissions, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(PermissionsActions.loadPermissionsSuccess, (state, { permissions }) => ({
    ...state,
    loading: false,
    permissions
  })),

  on(PermissionsActions.loadPermissionsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Create
    on(PermissionsActions.createPermission, (state) => ({
      ...state,
      loading: true,
      error: null,
    })),
    on(PermissionsActions.createPermissionSuccess, (state, { permission }) => ({
      ...state,
      loading: false,
      permissions: [...state.permissions, permission],
    })),
    on(PermissionsActions.createPermissionFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),

    // Update
    on(PermissionsActions.updatePermission, (state) => ({
      ...state,
      loading: true,
      error: null,
    })),
    on(PermissionsActions.updatePermissionSuccess, (state, { permission }) => ({
      ...state,
      permissions: state.permissions.map((t) => (t.id === permission.id ? permission : t)),
      loading: false,
    })),
    on(PermissionsActions.updatePermissionFailure, (state, { error }) => ({
      ...state,
      error,
      loading: false,
    }))
);
