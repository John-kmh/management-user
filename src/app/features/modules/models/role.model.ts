import { Permission } from "./permission.model";

export interface Role {
  id: number;
  team_id: number;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  permissions: Permission[];
}

export interface RoleListResponse {
  status: number;
  data: Role[];
  message: string;
}

export interface RoleDetailResponse extends Role {}

export interface CreateRoleRequest {
  guard_name: string;
  name: string;
  team_id: number;
}

export interface CreateRoleResponse extends Role {}

export interface AssignPermissionsRequest {
  roleId: number;
  permissions: number[];
}

export interface AssignPermissionsResponse {
  data: any;
  message: string;
  role: Role;
}
