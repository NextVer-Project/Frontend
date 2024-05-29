import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UIPresentationConfigService } from '../../services/ui-presentation-config.service';
import { User } from '../../interfaces/user';
import { AuthService } from '../../api/auth.service';
import { ScrollService } from '../../services/scroll.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {
  user: User | undefined;


  constructor(public router: Router, private authService: AuthService, private uiPresentationConfigService: UIPresentationConfigService, private scrollService: ScrollService) {
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
    });
  }

  get selectedTheme() {
    return this.uiPresentationConfigService.getSelectedTheme();
  }

  get selectedAnimation() {
    return this.uiPresentationConfigService.getSelectedAnimation();
  }

  get selectedScrollSnap() {
    return this.uiPresentationConfigService.getScrollSnapState();
  }

  toggleAnimationCheckbox() {
    const animationState = !this.selectedAnimation;
    this.uiPresentationConfigService.toggleBoxAnimation(animationState);
  }

  toggleScrollSnapCheckbox() {
    const scrollSnapState = !this.selectedScrollSnap; 
    this.uiPresentationConfigService.applyScrollSnap(scrollSnapState);
  }

  changeTheme(theme: string) {
    this.uiPresentationConfigService.setTheme(theme);
  }  

  ngOnInit(): void {
  }

  logOut(): void {
    this.authService.logout();
    this.user = undefined;
    this.router.navigate(['/']);
  }
}
