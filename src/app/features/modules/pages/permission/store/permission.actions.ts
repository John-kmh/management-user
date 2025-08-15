import { createAction, props } from '@ngrx/store';
import { Permission } from '../../../models/permission.model';

// Load Permissions
export const loadPermissions = createAction(
  '[Permissions] Load Permissions'
);

export const loadPermissionsSuccess = createAction(
  '[Permissions] Load Permissions Success',
  props<{ permissions: Permission[] }>()
);

export const loadPermissionsFailure = createAction(
  '[Permissions] Load Permissions Failure',
  props<{ error: any }>()
);

// Create Permission
export const createPermission = createAction(
  '[Permission] Create Permission',
  props<{ permission: Omit<Permission, 'id'> }>()
);
export const createPermissionSuccess = createAction(
  '[Permission] Create Permission Success',
  props<{ permission: Permission }>()
);
export const createPermissionFailure = createAction(
  '[Permission] Create Permission Failure',
  props<{ error: any }>()
);

// Update Permission
export const updatePermission = createAction(
  '[Permissions] Update Permission',
  props<{ permission: Permission }>()
);
export const updatePermissionSuccess = createAction(
  '[Permissions] Update Permission Success',
  props<{ permission: Permission }>()
);
export const updatePermissionFailure = createAction(
  '[Permissions] Update Permission Failure',
  props<{ error: string }>()
);
