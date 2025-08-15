import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RoleState } from './role.state';

export const selectRoleState = createFeatureSelector<RoleState>('roles');

export const selectAllRoles = createSelector(selectRoleState, state => state.roles);
export const selectRoleLoading = createSelector(selectRoleState, state => state.loading);
export const selectSelectedRole = createSelector(selectRoleState, state => state.selectedRole);
export const selectRoleError = createSelector(selectRoleState, state => state.error);
