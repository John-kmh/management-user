import { FlatUser } from '../../../models/user.model';

export interface UserState {
  users: FlatUser[];
  user: FlatUser | null;
  loading: boolean;
  error: any;
}

export const initialUserState: UserState = {
  users: [],
  user: null,
  loading: false,
  error: null,
};
