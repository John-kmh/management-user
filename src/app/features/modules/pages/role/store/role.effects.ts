import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RoleService } from '../role.service';
import * as RoleActions from './role.actions';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';

@Injectable()
export class RoleEffects {
  private actions$ = inject(Actions);
  private roleService = inject(RoleService);

  loadRoles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleActions.loadRoles),
      switchMap(() => this.roleService.getRoles()
        .pipe(
          map(roles => RoleActions.loadRolesSuccess({ roles })),
          catchError(error => of(RoleActions.loadRolesFailure({ error })))
        ))
    )
  );

  loadRoleDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleActions.loadRoleDetail),
      mergeMap(action => this.roleService.getRoleById(action.id)
        .pipe(
          map(role => RoleActions.loadRoleDetailSuccess({ role })),
          catchError(error => of(RoleActions.loadRoleDetailFailure({ error })))
        ))
    )
  );

  createRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleActions.createRole),
      mergeMap(action => this.roleService.createRole(action.role)
        .pipe(
          map(role => RoleActions.createRoleSuccess({ role })),
          catchError(error => of(RoleActions.createRoleFailure({ error })))
        ))
    )
  );

  updateRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleActions.updateRole),
      mergeMap(action => this.roleService.updateRole(action.id, action.role)
        .pipe(
          map(role => RoleActions.updateRoleSuccess({ role })),
          catchError(error => of(RoleActions.updateRoleFailure({ error })))
        ))
    )
  );

  assignPermissions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleActions.assignPermissions),
      mergeMap(action => this.roleService.assignPermissions(action.roleId, action.permissions)
        .pipe(
          map(role => RoleActions.assignPermissionsSuccess({ role })),
          catchError(error => of(RoleActions.assignPermissionsFailure({ error })))
        ))
    )
  );
}
