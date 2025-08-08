import {
  Component,
  EventEmitter,
  HostListener,
  inject,
  Input,
  Output,
  Renderer2,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../features/auth/state/auth.actions';

@Component({
  selector: 'app-header-bar',
  imports: [],
  templateUrl: './header-bar.component.html',
  styleUrl: './header-bar.component.css',
})
export class HeaderBarComponent {
  constructor(private renderer: Renderer2) {}
  @Input() title = 'User Management';
  @Output() toggleSidebar = new EventEmitter<void>();
  private store = inject(Store);

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const header = document.querySelector('.blur-on-scroll');
    if (!header) return;

    if (window.scrollY > 10) {
      this.renderer.addClass(header, 'scrolled');
    } else {
      this.renderer.removeClass(header, 'scrolled');
    }
  }

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  logout(): void {
    // Dispatch the logout action to the store
    this.store.dispatch(AuthActions.logout());
  }
}
