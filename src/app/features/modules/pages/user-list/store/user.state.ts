import { User } from '../../../models/user.model';

export interface UserState {
  users: User[];
  user: User;
  loading: boolean;
  error: any;
}

export const initialUserState: UserState = {
  users: [],
  user: {
    user_id: 0,
    username: '',
    email: '',
    user_full_name: '',
    emp_no: null,
    roles: [],
    permissions: [],
    created_at: '',
    updated_at: '',
  },
  loading: false,
  error: null,
};
