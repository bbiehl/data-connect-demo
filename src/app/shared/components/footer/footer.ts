import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-footer',
  imports: [MatToolbarModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  readonly title = signal('Data Connect Demo');
  readonly year = signal(new Date().getFullYear());
}
