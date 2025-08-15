import { Permission } from "../../../models/permission.model";

export interface PermissionsState {
  permissions: Permission[];
  loading: boolean;
  error: any;
}

export const initialPermissionState: PermissionsState = {
  permissions: [],
  loading: false,
  error: null
};
