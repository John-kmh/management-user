import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../features/auth/state/auth.actions';

@Component({
  selector: 'app-header-bar',
  imports: [],
  templateUrl: './header-bar.component.html',
  styleUrl: './header-bar.component.css',
})
export class HeaderBarComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
  private store = inject(Store);

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  logout(): void {
    // Dispatch the logout action to the store
    this.store.dispatch(AuthActions.logout());
  }
}
