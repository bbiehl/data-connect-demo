import { ChangeDetectionStrategy, Component, inject, input, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { NavigationService } from '../../../navigation/navigation.service';

@Component({
  selector: 'app-navlinks',
  imports: [MatButtonModule, RouterModule],
  templateUrl: './navlinks.html',
  styleUrl: './navlinks.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navlinks implements OnInit {
  alignment = input<'horizontal' | 'vertical'>('horizontal');
  private navigationService = inject(NavigationService);
  readonly class = signal('');

  ngOnInit(): void {
    if (this.alignment() === 'horizontal') {
      this.class.set('horizontal-links');
    } else {
      this.class.set('vertical-links');
    }
  }

  onLinkClicked(): void {
    this.navigationService.closeSidenav();
  }
}
