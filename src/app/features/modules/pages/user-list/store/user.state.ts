import { User } from '../../../models/user.model';

export interface UserState {
  users: User[];
  selectedUser: User | null;
  loading: boolean;
  error: any;
}

export const initialState: UserState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
};
