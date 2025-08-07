import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { UserResponseItem } from '../../models/user.model';
import { UserService } from './user.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { selectAllUsers } from './state/user.selectors';
import { UserActions } from './state/user.actions';
import { UserFormComponent } from "./user-form/user-form.component";

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, UserFormComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit {
   private store = inject(Store);
  private router = inject(Router);

  users$ = this.store.select(selectAllUsers);

  ngOnInit(): void {
    this.store.dispatch(UserActions.loadUsers());
  }

  create() {
    console.log('Create user');
    this.router.navigate(['/user/create']);
  }

  edit(id: number) {
    this.router.navigate(['/users/edit', id]);
  }

  remove(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.store.dispatch(UserActions.deleteUser({ id }));
    }
  }
}
