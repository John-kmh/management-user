import { createAction, props } from '@ngrx/store';
import {
  Role
} from '../../../models/role.model';
import { Permission } from '../../../models/permission.model';

// LIST
export const loadRoles = createAction('[Role] Load Roles');
export const loadRolesSuccess = createAction('[Role] Load Roles Success', props<{ roles: Role[] }>());
export const loadRolesFailure = createAction('[Role] Load Roles Failure', props<{ error: any }>());

// DETAIL
export const loadRoleDetail = createAction('[Role] Load Role Detail', props<{ id: number }>());
export const loadRoleDetailSuccess = createAction('[Role] Load Role Detail Success', props<{ role: Role }>());
export const loadRoleDetailFailure = createAction('[Role] Load Role Detail Failure', props<{ error: any }>());

// Create
export const createRole = createAction('[Role] Create Role', props<{ role: Partial<Role> }>());
export const createRoleSuccess = createAction('[Role] Create Role Success', props<{ role: Role }>());
export const createRoleFailure = createAction('[Role] Create Role Failure', props<{ error: any }>());

// Update
export const updateRole = createAction('[Role] Update Role', props<{ id: number, role: Partial<Role> }>());
export const updateRoleSuccess = createAction('[Role] Update Role Success', props<{ role: Role }>());
export const updateRoleFailure = createAction('[Role] Update Role Failure', props<{ error: any }>());

// Assign Permissions
export const assignPermissions = createAction('[Role] Assign Permissions', props<{ roleId: number, permissions: number[] }>());
export const assignPermissionsSuccess = createAction('[Role] Assign Permissions Success', props<{ role: Role }>());
export const assignPermissionsFailure = createAction('[Role] Assign Permissions Failure', props<{ error: any }>());

