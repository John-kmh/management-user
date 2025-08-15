import { Component, inject, Input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Permission } from '../../../models/permission.model';
import { createPermission, updatePermission } from '../store/permission.actions';

@Component({
  selector: 'app-permission-form',
  imports: [ReactiveFormsModule],
  templateUrl: './permission-form.component.html',
  styleUrl: './permission-form.component.css'
})
export class PermissionFormComponent {
private fb = inject(FormBuilder); // First initialize the injectable
  private store = inject(Store);
  public activeModal = inject(NgbActiveModal);

  @Input() permissions?: Permission;
  @Input() isEdit = false;

  // Now you can safely use this.fb
  permissionForm = this.fb.group({
    name: ['', [Validators.required]],
  });

  ngOnInit() {
      if (this.permissions) {
        this.permissionForm.patchValue({
          name: this.permissions.name,
        });
      }
    }

    onSubmit() {
      this.permissionForm.markAllAsTouched();

      if (this.permissionForm.invalid) return;

      const permissionData = {
        ...this.permissionForm.value,
        ...(this.isEdit && { id: this.permissions?.id }),
      };

      if (this.isEdit) {
        this.store.dispatch(updatePermission({ permission: permissionData as Permission }));
      } else {
        this.store.dispatch(
          createPermission({ permission: permissionData as Omit<Permission, 'id'> })
        );
      }

      this.activeModal.close(permissionData);
    }

    onCancel() {
      this.activeModal.dismiss('cancel');
    }
}
