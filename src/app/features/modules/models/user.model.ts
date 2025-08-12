export interface User {
  user_id: number;
  username: string;
  email: string;
  user_full_name: string;
  emp_no?: string | null;
  roles: string[];
  permissions?: string[];
}

export interface UserApiItem {
  user: {
    user_id: number;
    username: string;
    email: string;
    user_full_name: string;
    emp_no?: string | null;
  };
  roles: string[];
  permissions?: string[];
}

export interface UserItemResponse {
  status: number;
  data: UserApiItem;
  message: string;
}

export interface UsersResponse {
  status: number;
  data: UserApiItem[];
  message: string;
}
