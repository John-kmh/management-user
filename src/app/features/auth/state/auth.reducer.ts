import { createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { AuthResponse, User } from '../../../core/services/auth.service';

export interface AuthState {
  user: User | null;
  token: string | null;
  error: string | null;
  status: string;
  loading: boolean;
}

export const initialState: AuthState = {
  user: null,
  token: null,
  error: null,
  status: 'pending',
  loading: false,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state) => ({
    ...state,
    status: 'loading',
    loading: true,
  })),
  on(AuthActions.loginSuccess, (state, { authResponse }) => ({
    ...state,
    user: authResponse.user,
    token: authResponse.access_token,
    error: null,
    status: 'success',
    loading: false,
  })),
  on(AuthActions.restoreSession, (state, { token }) => ({
    ...state,
    token,
    status: 'success',
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    user: null,
    token: null,
    error,
    status: 'error',
    loading: false,
  })),
  on(AuthActions.logout, () => initialState)
);
