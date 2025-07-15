import { Component, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css',
})
export class EditUserComponent {
  userEditForm: FormGroup;
  showValidationErrors = signal(false);

  constructor(private fb: FormBuilder) {
    this.userEditForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z0-9_]{4,20}$')],
      ],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]],
      address: ['', [Validators.required, Validators.minLength(10)]],
      role: ['', [Validators.required]],
      team: ['', [Validators.required]],
      permissions: this.fb.group(
        {
          read: [false],
          write: [false],
          delete: [false],
        },
        { validators: this.atLeastOnePermission }
      ),
    });
  }

  // Custom validator for at least one permission
  atLeastOnePermission(group: AbstractControl) {
    const permissions = group.value;
    return Object.values(permissions).includes(true)
      ? null
      : { atLeastOneRequired: true };
  }

  onSubmit() {
    if (this.userEditForm.valid) {
      console.log('Form submitted:', this.userEditForm.value);
      // Handle form submission
    } else {
      this.showValidationErrors.set(true);
      this.userEditForm.markAllAsTouched();
    }
  }

  onCancel() {
    this.userEditForm.reset();
    this.showValidationErrors.set(false);
  }
}
