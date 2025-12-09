import { Component, inject, signal } from '@angular/core';
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
  protected readonly title = signal('data-connect-demo');
  themeService = inject(ThemeService);
}
