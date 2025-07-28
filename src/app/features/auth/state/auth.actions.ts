import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AuthResponse } from '../../../core/services/auth.service';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    Login: props<{ credentials: { email: string; password: string } }>(),
    'Login Success': props<{ authResponse: AuthResponse }>(),
    'Restore Session': props<{ token: string }>(),
    'Login Failure': props<{ error: string }>(),
    Logout: emptyProps(),
  },
});
