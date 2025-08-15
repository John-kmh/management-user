import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { selectAllPermissions, selectPermissionsError, selectPermissionsLoading } from './store/permissin.selectors';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Permission } from '../../models/permission.model';
import { loadPermissions } from './store/permission.actions';
import { PermissionFormComponent } from './permission-form/permission-form.component';

@Component({
  selector: 'app-permission',
  imports: [CommonModule],
  templateUrl: './permission.component.html',
  styleUrl: './permission.component.css'
})
export class PermissionComponent implements OnInit {
  private modalService = inject(NgbModal);
  private store = inject(Store);

  permissions$: Observable<Permission[]> = this.store.select(selectAllPermissions);
  loading$ = this.store.select(selectPermissionsLoading);
  error$ = this.store.select(selectPermissionsError);


  ngOnInit(): void {
    this.loadPermissions();
  }

  loadPermissions(): void {
    this.store.dispatch(loadPermissions());
  }

  openModal(permission?: Permission): void {
      const modalRef = this.modalService.open(PermissionFormComponent, {
        size: 'lg',
        centered: true,
        backdrop: 'static',
      });

      // No optional chaining needed since we control the modal instance
      modalRef.componentInstance.permission = permission;
      modalRef.componentInstance.isEdit = Boolean(permission);

      modalRef.result
        .then((result) => {
          // Do something with the result if needed
          console.log('Modal closed with result:', result);
          // this.loadpermissions(); // Reload permissions if you want to reflect changes
        })
        .catch((reason) => {
          // This handles dismiss like onCancel
          console.log('Modal dismissed:', reason); // No more ERROR cancel
        });
    }
}
