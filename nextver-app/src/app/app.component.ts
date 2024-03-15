import { Component, OnInit, Renderer2, AfterViewInit, HostListener } from '@angular/core';
import { UIPresentationConfigService } from './services/ui-presentation-config.service';
import { Router } from '@angular/router';
import { Platform } from '@angular/cdk/platform';
import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string = 'nextver-app';
  public shouldBeDropdown = false;


  constructor(public router: Router, public platform: Platform, private uiPresentationConfigService: UIPresentationConfigService) { }

  ngOnInit() {
    const selectedTheme = this.uiPresentationConfigService.getSelectedTheme();
    this.uiPresentationConfigService.setTheme(selectedTheme);

    const animationEnabled = this.uiPresentationConfigService.getSelectedAnimation();
    this.uiPresentationConfigService.toggleBoxAnimation(animationEnabled);

    const scrollSnapEnabled = this.uiPresentationConfigService.getScrollSnapState();
    this.uiPresentationConfigService.applyScrollSnap(scrollSnapEnabled);

    this.resizeScreen();
  }

  public resizeScreen(): void {
    const screenWidth = window.innerWidth;
    this.shouldBeDropdown = screenWidth <= 1000 || this.platform.ANDROID || this.platform.IOS;
  }

  get selectedScrollSnapState() {
    return this.uiPresentationConfigService.getScrollSnapState();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    if (this.selectedScrollSnapState) { // Sprawdź, czy Scroll Snap jest aktywny
      this.uiPresentationConfigService.applyScrollSnap(true); // Wywołaj metodę applyScrollSnap tylko gdy Scroll Snap jest aktywny
    }
  }

}


@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
