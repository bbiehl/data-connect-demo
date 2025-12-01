import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './shared/components/footer/footer';
import { Navbar } from './navigation/components/navbar/navbar';
import { Sidenav } from './navigation/components/sidenav/sidenav';

@Component({
  selector: 'app-root',
  imports: [Navbar, Sidenav],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('data-connect-demo');
}
