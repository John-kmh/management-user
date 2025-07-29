import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface User {
  name: any;
  email: any;
}

// Your AuthResponse interface
export interface AuthResponse {
  user: any; // Or your User interface
  access_token: string;
  expires_in: number;
  refresh_token: string;
}

const SESSION_KEY = 'superadmin';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

 login(
  credentials: {
    email: string;
    password: string;
  }
): Observable<AuthResponse> {
  const body = new HttpParams()
    .set('username', credentials.email)
    .set('password', credentials.password)
    .set('grant_type', 'password')
    .set('client_id', '0197d55c-7338-7249-b9ca-6be67b78b007')
    .set('client_secret', '3B17cBmoTaGdeGqTxFQXb96OplIEm0jfAMicuxtR');

  const headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  });

  return this.http
    .post<AuthResponse>(`${this.apiUrl}/oauth/token`, body, { headers })
    .pipe(tap((response) => this.setSession(response)));
}


  logout(): void {
    localStorage.removeItem(SESSION_KEY);
  }

  private setSession(authResponse: AuthResponse): void {
    const expiresAt = new Date().getTime() + authResponse.expires_in * 1000;
    const session = { ...authResponse, expires_at: expiresAt };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }

  getSession(): (AuthResponse & { expires_at: number }) | null {
    const sessionStr = localStorage.getItem(SESSION_KEY);
    if (!sessionStr) {
      return null;
    }
    return JSON.parse(sessionStr);
  }

  isLoggedIn(): boolean {
    const session = this.getSession();
    if (!session) {
      return false;
    }
    // Check if the current time is before the expiration time
    return new Date().getTime() < session.expires_at;
  }

  getToken(): string | null {
    return this.getSession()?.access_token || null;
  }
}
