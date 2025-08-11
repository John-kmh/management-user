export interface User {
  user_id: number;
  username: string;
  email: string;
  user_full_name: string;
  emp_no: string | null;
  roles: string[];
  permissions?: string[];
}

export interface UsersResponse {
  status: number;
  data: User[];
  message: string;
}
export interface UserItemResponse {
  status: number;
  data: User;
  message: string;
}
