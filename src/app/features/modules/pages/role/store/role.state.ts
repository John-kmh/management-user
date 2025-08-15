import { Role } from '../../../models/role.model';

export interface RoleState {
  roles: Role[];
  selectedRole: Role | null;
  loading: boolean;
  error: any;
}

export const initialState: RoleState = {
  roles: [],
  selectedRole: null,
  loading: false,
  error: null,
};
