import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthActions } from '../../state/auth.actions';
import { selectAuthLoading } from '../../state/auth.selectors';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  loading$!: Observable<boolean>;
  submitted = false;
  showPassword = false;
  showValidationErrors = signal(false);

  constructor(private fb: FormBuilder, private store: Store) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      EmailId: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required]],
    });

    this.loading$ = this.store.select(selectAuthLoading);
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.loginForm.invalid) {
      this.showValidationErrors.set(true);
      return;
    }

    console.log(this.loginForm.value);
    const credentials = this.loginForm.value;
    this.store.dispatch(AuthActions.login({ credentials }));
  }
  ngOnDestroy(): void {}
}
