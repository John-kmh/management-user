// export interface User {
//   user_id?: number;
//   username: string;
//   email: string;
//   user_full_name: string;
//   emp_no?: string | null;
// }

// export interface UserResponseItem {
//   user: User;
//   roles: string[];
//   permissions: string[];
// }

export interface User {
  user_id: number;
  username: string;
  email: string;
  user_full_name: string;
  emp_no: string | null;
}

export interface UserResponseItem {
  user: User;
  roles: string[];
  permissions: string[];
}


export interface UsersApiResponse {
  status: number;
  data: UserResponseItem[];
  message: string;
}
