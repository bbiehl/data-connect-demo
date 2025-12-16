import { Component, inject } from '@angular/core';
import { AuthStore } from './auth/auth.store';
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
  private readonly authStore = inject(AuthStore);
  protected readonly themeService = inject(ThemeService);

  constructor() {
    this.authStore.checkForAuthenticatedUser();
  }
}
