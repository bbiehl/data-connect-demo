import { MediaMatcher } from '@angular/cdk/layout';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public isDarkMode = signal(false);

  constructor(mediaMatcher: MediaMatcher) {
    if (mediaMatcher.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.isDarkMode.set(true);
    } else {
      this.isDarkMode.set(false);
    }
  }

  public toggleDarkMode(): void {
    this.isDarkMode.update((isDark) => !isDark);
  }
}
