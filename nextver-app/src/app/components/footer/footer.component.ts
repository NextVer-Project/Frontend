import { Component } from '@angular/core';
import { UIPresentationConfigService } from '../../services/ui-presentation-config.service';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})

export class FooterComponent {

  constructor(private uiPresentationConfigService: UIPresentationConfigService) { }

  get selectedTheme() {
    return this.uiPresentationConfigService.getSelectedTheme();
  }

  changeTheme(theme: string) {
    this.uiPresentationConfigService.setTheme(theme);
  }
}
