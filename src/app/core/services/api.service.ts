import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseUrl = environment.baseUrl + '/api';

  constructor(private http: HttpClient) {}

  /**
   * Performs a GET request.
   * @param path The endpoint path (e.g., '/products').
   * @param params Optional HTTP parameters.
   */
  get<T>(path: string, params: HttpParams = new HttpParams()): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${path}`, { params });
  }

  /**
   * Performs a POST request.
   * @param path The endpoint path.
   * @param body The request payload.
   * @param options Optional HTTP options.
   */
  post<T>(
    path: string,
    body: object = {},
    options: object = {}
  ): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${path}`, body, options);
  }

  /**
   * Performs a PUT request.
   * @param path The endpoint path.
   * @param body The request payload.
   */
  put<T>(path: string, body: object = {}): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${path}`, body);
  }

  /**
   * Performs a DELETE request.
   * @param path The endpoint path.
   */
  delete<T>(path: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${path}`);
  }
}
