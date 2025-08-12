import { Store } from '@ngrx/store';
import { Component, inject, Input, input, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { loadUser } from '../store/user.actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  imports: [CommonModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css',
})
export class UserDetailComponent implements OnInit {
  private store = inject(Store);
  @Input() user!: User;
  constructor(public activeModal: NgbActiveModal) {}
  ngOnInit(): void {
    this.store.dispatch(loadUser({ id: this.user.user_id }));
  }
}
