import { createReducer, on } from '@ngrx/store';
import * as RoleActions from './role.actions';
import { initialState } from './role.state';

export const roleReducer = createReducer(
  initialState,
  on(RoleActions.loadRoles, state => ({ ...state, loading: true })),
  on(RoleActions.loadRolesSuccess, (state, { roles }) => ({ ...state, roles, loading: false })),
  on(RoleActions.loadRolesFailure, (state, { error }) => ({ ...state, error, loading: false })),

  on(RoleActions.loadRoleDetail, state => ({ ...state, loading: true })),
  on(RoleActions.loadRoleDetailSuccess, (state, { role }) => ({ ...state, selectedRole: role, loading: false })),
  on(RoleActions.loadRoleDetailFailure, (state, { error }) => ({ ...state, error, loading: false })),

  on(RoleActions.createRole, state => ({ ...state, loading: true })),
  on(RoleActions.createRoleSuccess, (state, { role }) => ({ ...state, roles: [...state.roles, role], loading: false })),
  on(RoleActions.createRoleFailure, (state, { error }) => ({ ...state, error, loading: false })),

  on(RoleActions.updateRole, state => ({ ...state, loading: true })),
  on(RoleActions.updateRoleSuccess, (state, { role }) => ({
    ...state,
    roles: state.roles.map(r => r.id === role.id ? role : r),
    loading: false
  })),
  on(RoleActions.updateRoleFailure, (state, { error }) => ({ ...state, error, loading: false })),

  on(RoleActions.assignPermissions, state => ({ ...state, loading: true })),
  on(RoleActions.assignPermissionsSuccess, (state, { role }) => ({
    ...state,
    roles: state.roles.map(r => r.id === role.id ? role : r),
    selectedRole: role,
    loading: false
  })),
  on(RoleActions.assignPermissionsFailure, (state, { error }) => ({ ...state, error, loading: false }))
);
