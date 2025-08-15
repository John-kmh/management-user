import { Injectable } from '@angular/core';
import { ApiService } from '../../../../core/services/api.service';
import { map, Observable } from 'rxjs';
import { Permission, PermissionItemResponse, PermissionResponse } from '../../models/permission.model';
@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  constructor(private api: ApiService) { }

  getPermissions(): Observable<PermissionResponse> {
    return this.api.get('/v1/permissions');
  }

  createPermission(permission: Omit<Permission, 'id'>): Observable<Permission> {
      return this.api
        .post<PermissionItemResponse>('/v1/permissions', permission)
        .pipe(map((res) => res.data));
    }

     updatePermission(permission: Permission): Observable<Permission> {
      return this.api
        .post<PermissionItemResponse>(`/v1/permissions/${permission.id}`, permission)
        .pipe(map((res) => res.data));
    }
}
