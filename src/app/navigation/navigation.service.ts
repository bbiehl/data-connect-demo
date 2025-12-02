import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  sidenavOpened = signal(false);

  closeSidenav(): void {
    this.sidenavOpened.set(false);
  }

  toggleSidenav(): void {
    this.sidenavOpened.update((opened) => !opened);
  }
}
