import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { selectAllUsers } from './store/user.selectors';
import { deleteUser, loadUsers } from './store/user.actions';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit {
  private store = inject(Store);
  private router = inject(Router);

  users$: Observable<User[]> = this.store.select(selectAllUsers);

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.store.dispatch(loadUsers());
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
      this.store.dispatch(deleteUser({ id }));
    }
  }
}
