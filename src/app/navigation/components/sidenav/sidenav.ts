import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { Footer } from '../../../shared/components/footer/footer';
import { GITHUB_ICON, LINKEDIN_ICON, TWITTER_ICON } from '../../../shared/constants/icons.const';
import { NavigationService } from '../../navigation.service';

@Component({
  selector: 'app-sidenav',
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatSidenavModule,
    RouterModule,
    Footer,
  ],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidenav {
  navigationService = inject(NavigationService);
  showBackToTopFab = signal(false);

  constructor() {
    const iconRegistry = inject(MatIconRegistry);
    const sanitizer = inject(DomSanitizer);
    iconRegistry.addSvgIconLiteral(
      'linkedin-icon',
      sanitizer.bypassSecurityTrustHtml(LINKEDIN_ICON)
    );
    iconRegistry.addSvgIconLiteral('github-icon', sanitizer.bypassSecurityTrustHtml(GITHUB_ICON));
    iconRegistry.addSvgIconLiteral('twitter-icon', sanitizer.bypassSecurityTrustHtml(TWITTER_ICON));
  }
}
