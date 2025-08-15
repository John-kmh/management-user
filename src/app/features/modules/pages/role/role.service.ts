import { ApiService } from '../../../../core/services/api.service';
import { Injectable } from '@angular/core';
import {
  Role
} from '../../models/role.model';
import { map, Observable } from 'rxjs';
import { Permission } from '../../models/permission.model';

@Injectable({ providedIn: 'root' })
export class RoleService {
  constructor(private api: ApiService) { }

  getRoles(): Observable<Role[]> {
    return this.api.get<{status:number,data:Role[]}>('/v1/roles').pipe(map(res => res.data));
  }

  getRoleById(id: number): Observable<Role> {
    return this.api.get<Role>(`/v1/roles/${id}`);
  }

  createRole(role: Partial<Role>): Observable<Role> {
    return this.api.post<Role>('/v1/roles', role);
  }

  updateRole(id: number, role: Partial<Role>): Observable<Role> {
    return this.api.put<Role>(`/v1/roles/${id}`, role);
  }

  assignPermissions(roleId: number, permissions: number[]): Observable<Role> {
    return this.api.post<{ message: string, role: Role }>(`/v1/roles/${roleId}/assign-permissions`, { permissions }).pipe(map(res => res.role));
  }
}
