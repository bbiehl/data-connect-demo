import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Navlinks } from '../navlinks/navlinks';

@Component({
  selector: 'app-footer',
  imports: [MatButtonModule, MatDividerModule, MatIconModule, Navlinks],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  readonly title = signal('Data Connect Demo');
  readonly year = signal(new Date().getFullYear());
}
