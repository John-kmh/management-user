import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from '../../../../core/services/api.service';
import { User, UserItemResponse, UsersResponse } from '../../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private api: ApiService) {}

  getUsers(): Observable<UsersResponse> {
    return this.api.get('/v1/users');
  }

  getUserById(id: number): Observable<User> {
    return this.api.get<any>(`/v1/users/${id}`).pipe(map((res) => res.user));
  }

  createUser(user: Omit<User, 'user_id'>): Observable<User> {
    return this.api
      .post<UserItemResponse>('/v1/users', user)
      .pipe(map((res) => res.data));
  }

  updateUser(user: User): Observable<User> {
    return this.api
      .put<UserItemResponse>(`/v1/teams/${user.user_id}`, user)
      .pipe(map((res) => res.data));
  }

  deleteUser(id: number): Observable<any> {
    return this.api.delete(`/v1/users/${id}`);
  }
}
