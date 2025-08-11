import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from '../../../../core/services/api.service';
import { User, UsersResponse } from '../../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private api: ApiService) {}

  getUsers(): Observable<UsersResponse> {
    return this.api.get('/v1/users');
  }

  getUserById(id: number): Observable<User> {
    return this.api.get<any>(`/v1/users/${id}`).pipe(map((res) => res.user));
  }

  createUser(user: User): Observable<any> {
    return this.api.post('/v1/users', user);
  }

  updateUser(id: number, user: User): Observable<any> {
    return this.api.put(`/v1/users/${id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.api.delete(`/v1/users/${id}`);
  }
}
