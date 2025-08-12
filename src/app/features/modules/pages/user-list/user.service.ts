import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from '../../../../core/services/api.service';
import { User, UsersResponse, UserItemResponse } from '../../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private api: ApiService) {}

  getUsers(): Observable<User[]> {
    return this.api.get<UsersResponse>('/v1/users').pipe(
      map((res) =>
        res.data.map((item) => ({
          ...item.user,
          roles: item.roles,
          permissions: item.permissions,
        }))
      )
    );
  }

  getUserById(id: number): Observable<User> {
    return this.api.get<UserItemResponse>(`/v1/users/${id}`).pipe(
      map((res) => ({
        ...res.data.user,
        roles: res.data.roles,
        permissions: res.data.permissions,
      }))
    );
  }

  createUser(user: Partial<User>): Observable<User> {
    return this.api.post<UserItemResponse>('/v1/users', user).pipe(
      map((res) => ({
        ...res.data.user,
        roles: res.data.roles,
        permissions: res.data.permissions,
      }))
    );
  }

  updateUser(user: User): Observable<User> {
    return this.api
      .put<UserItemResponse>(`/v1/users/${user.user_id}`, user)
      .pipe(
        map((res) => ({
          ...res.data.user,
          roles: res.data.roles,
          permissions: res.data.permissions,
        }))
      );
  }

  deleteUser(id: number): Observable<any> {
    return this.api.delete(`/v1/users/${id}`);
  }
}
