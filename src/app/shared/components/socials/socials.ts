import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { GITHUB_ICON, LINKEDIN_ICON, TWITTER_ICON } from '../../constants/icons.const';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-socials',
  imports: [MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './socials.html',
  styleUrl: './socials.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Socials {
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
