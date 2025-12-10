import { Component, inject } from '@angular/core';
import { injectDispatch } from '@ngrx/signals/events';
import { authEvents } from './auth/auth.store';
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
  readonly dispatch = injectDispatch(authEvents);
  readonly themeService = inject(ThemeService);

  constructor() {
    this.dispatch.checkforAuthenticatedUser();
  }
}
