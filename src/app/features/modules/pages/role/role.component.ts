import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  loadRoles,
  createRole,
  assignPermissions,
} from './store/role.actions';
import { selectAllRoles } from './store/role.selectors';
import { Role, CreateRoleRequest } from '../../models/role.model';
import { CommonModule } from '@angular/common';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Permission } from '../../models/permission.model';
import { loadPermissions } from '../permission/store/permission.actions';
import { selectAllPermissions } from '../permission/store/permissin.selectors';

@Component({
  selector: 'app-role',
  imports: [CommonModule, FormsModule],
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  // private modalService = inject(NgbModal);
  private store = inject(Store);
  roles$: Observable<Role[]> = this.store.select(selectAllRoles);
  permissions$: Observable<Permission[]> = this.store.select(selectAllPermissions);
  showFormModal = false;
  editMode = false;
  formData: CreateRoleRequest = { guard_name: '', name: '', team_id: 1 };

  showPermissionModal = false;
  selectedRole: Role | null = null;

  selectedPermissionIds: number[] = [];

  // Role Details Modal
  showDetailsModal = false;
  detailsRole: Role | null = null;

  ngOnInit(): void {
    this.store.dispatch(loadRoles());
    this.store.dispatch(loadPermissions());
  }

  openCreateForm() {
    this.editMode = false;
    this.formData = { guard_name: 'api', name: '', team_id: 1 };
    this.showFormModal = true;
  }

  openEditForm(role: Role) {
    this.editMode = true;
    this.formData = {
      guard_name: role.guard_name,
      name: role.name,
      team_id: role.team_id
    };
    this.showFormModal = true;
  }

  closeFormModal() {
    this.showFormModal = false;
  }

  saveRole() {
    this.store.dispatch(createRole({ role: this.formData }));
    this.closeFormModal();
  }

  openAssignPermissions(role: Role) {
    this.selectedRole = role;
    this.selectedPermissionIds = role.permissions.map(p => p.id);
    this.showPermissionModal = true;
  }

  closePermissionModal() {
    this.showPermissionModal = false;
  }

  togglePermission(id: number) {
    if (this.selectedPermissionIds.includes(id)) {
      this.selectedPermissionIds = this.selectedPermissionIds.filter(p => p !== id);
    } else {
      this.selectedPermissionIds.push(id);
    }
  }

  savePermissions() {
  if (!this.selectedRole) return;

  this.store.dispatch(assignPermissions({
      roleId: this.selectedRole.id,
      permissions: this.selectedPermissionIds
  }));

  this.closePermissionModal();
}



  viewRoleDetails(role: Role) {
    this.detailsRole = role;
    this.showDetailsModal = true;
  }

  closeDetailsModal() {
    this.showDetailsModal = false;
    this.detailsRole = null;
  }
}
