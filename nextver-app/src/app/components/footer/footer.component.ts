import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { UIPresentationConfigService } from '../../services/ui-presentation-config.service';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})

export class FooterComponent {
  showFooter = true;

  constructor(private uiPresentationConfigService: UIPresentationConfigService, private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showFooter = !event.url.includes('confirm-email');
      }
    });
  }

  get selectedTheme() {
    return this.uiPresentationConfigService.getSelectedTheme();
  }

  changeTheme(theme: string) {
    this.uiPresentationConfigService.setTheme(theme);
  }
}
