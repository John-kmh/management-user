import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PermissionService } from '../permission.service';
import * as PermissionsActions from './permission.actions';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';

@Injectable()
export class PermissionsEffects {
  private actions$ = inject(Actions);
  private permissionService = inject(PermissionService);

  loadPermissions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PermissionsActions.loadPermissions),
      switchMap(() =>
        this.permissionService.getPermissions().pipe(
          map((res) =>
            PermissionsActions.loadPermissionsSuccess({ permissions: res.data })
          ),
          catchError((error) =>
            of(PermissionsActions.loadPermissionsFailure({ error }))
          )
        )
      )
    )
  );

  createPermission$ = createEffect(() =>
  this.actions$.pipe(
    ofType(PermissionsActions.createPermission),
    switchMap(({ permission }) =>
      this.permissionService.createPermission(permission).pipe(
        map((newPermission) =>
          PermissionsActions.createPermissionSuccess({ permission: newPermission })
        ),
        catchError((error) =>
          of(PermissionsActions.createPermissionFailure({ error }))
        )
      )
    )
  )
);

updatePermission$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PermissionsActions.updatePermission),
      mergeMap(({ permission }) =>
        this.permissionService.updatePermission(permission).pipe(
          map((updatedPermission) =>
            PermissionsActions.updatePermissionSuccess({ permission: updatedPermission })
          ),
          catchError((error) =>
            of(PermissionsActions.updatePermissionFailure({ error: error.message }))
          )
        )
      )
    )
  );

}
