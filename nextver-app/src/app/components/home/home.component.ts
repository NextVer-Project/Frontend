import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { ScrollService } from '../../services/scroll.service';
import { UIPresentationConfigService } from '../../services/ui-presentation-config.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
 

  constructor(private uiPresentationConfigService: UIPresentationConfigService) { }

  get selectedTheme() {
    return this.uiPresentationConfigService.getSelectedTheme();
  }

  get selectedAnimation() {
    return this.uiPresentationConfigService.getSelectedAnimation();
  }
}
