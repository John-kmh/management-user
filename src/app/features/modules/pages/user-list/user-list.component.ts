import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import {
  selectAllUsers,
  selectUsersError,
  selectUsersLoading,
} from './store/user.selectors';
import { deleteUser, loadUsers } from './store/user.actions';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserDetailComponent } from './user-detail/user-detail.component';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent {
  private store = inject(Store);
  private modalService = inject(NgbModal);

  users$: Observable<User[]> = this.store.select(selectAllUsers);
  loading$ = this.store.select(selectUsersLoading);
  error$ = this.store.select(selectUsersError);

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.store.dispatch(loadUsers());
  }

  openDetailModal(user: User): void {
    const modalRef = this.modalService.open(UserDetailComponent, {
      size: 'md',
      centered: true,
    });
    modalRef.componentInstance.user = user;
  }
}
