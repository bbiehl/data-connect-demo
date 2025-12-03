import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { GITHUB_ICON, LINKEDIN_ICON, TWITTER_ICON } from '../../../shared/constants/icons.const';
import { Theme } from '../../../theme/components/theme/theme';
import { NavigationService } from '../../navigation.service';

@Component({
  selector: 'app-navbar',
  imports: [MatButtonModule, MatIconModule, MatToolbarModule, RouterModule, Theme],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {
  navigationService = inject(NavigationService);

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
