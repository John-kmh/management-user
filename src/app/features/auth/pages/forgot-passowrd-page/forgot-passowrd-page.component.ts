import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-passowrd-page',
  imports: [ReactiveFormsModule],
  templateUrl: './forgot-passowrd-page.component.html',
  styleUrl: './forgot-passowrd-page.component.css',
})
export class ForgotPassowrdPageComponent {
  forgotForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get email() {
    return this.forgotForm.get('email')!;
  }

  onSubmit() {
    if (this.forgotForm.valid) {
      console.log('Sending recovery to:', this.email.value);
      // TODO: Call password recovery API
    }
  }
}
