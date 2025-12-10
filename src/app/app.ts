import { Component, inject } from '@angular/core';
import { injectDispatch } from '@ngrx/signals/events';
import { authAPIEvents, AuthStore } from './auth/auth.store';
import { Navbar } from './navigation/components/navbar/navbar';
import { Sidenav } from './navigation/components/sidenav/sidenav';
import { ThemeService } from './theme/theme.service';

@Component({
  selector: 'app-root',
  imports: [Navbar, Sidenav],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly dispatch = injectDispatch(authAPIEvents);
  // This is buggy since AuthStore is not used directly and provided at the root level
  private readonly authStore = inject(AuthStore);
  readonly themeService = inject(ThemeService);

  constructor() {
    this.dispatch.checkforAuthenticatedUser();
  }
}
