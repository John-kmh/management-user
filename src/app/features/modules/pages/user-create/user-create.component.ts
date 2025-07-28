import { Component, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-user-create',
  imports: [ReactiveFormsModule],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css',
})
export class UserCreateComponent {
  userForm: FormGroup;
  showValidationErrors = signal(false);

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
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
    if (this.userForm.valid) {
      console.log('Form submitted:', this.userForm.value);
      // Handle form submission
    } else {
      this.showValidationErrors.set(true);
      this.userForm.markAllAsTouched();
    }
  }

  onCancel() {
    this.userForm.reset();
    this.showValidationErrors.set(false);
  }
}
