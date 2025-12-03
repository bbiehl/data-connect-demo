import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ThemeService } from '../../theme.service';

@Component({
  selector: 'app-theme',
  imports: [MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './theme.html',
  styleUrl: './theme.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Theme {
  themeService = inject(ThemeService);

  toggleDarkMode(): void {
    this.themeService.toggleDarkMode();
  }
}
