export interface User {
  user_id: number;
  username: string;
  email: string;
  user_full_name: string;
  emp_no: string | null;
}

export interface UserApiResponse {
  user: User;
  roles: string[];
  permissions?: string[];
}

export interface UsersResponse {
  status: number;
  data: UserApiResponse[];
  message: string;
}
export interface UserItemResponse {
  status: number;
  data: UserApiResponse;
  message: string;
}

export interface FlatUser extends User {
  roles: string[];
  permissions?: string[];
}
