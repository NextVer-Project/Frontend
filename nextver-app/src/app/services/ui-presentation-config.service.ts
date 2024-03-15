import { Injectable, Inject, Renderer2, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UIPresentationConfigService {
  private renderer: Renderer2;
  private originalBoxShadows: Record<string, string> = {};
  private selectedTheme: string = '';
  private selectedThemeKey = 'selectedTheme';
  private animationEnabled: boolean = false;
  private animationEnabledKey = 'animationEnabled';
  private scrollSnapEnabled: boolean = false;
  private scrollSnapEnabledKey = 'scrollSnapEnabled';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  getSelectedTheme(): string {
    return localStorage.getItem(this.selectedThemeKey) || this.selectedTheme;
  }

  getAnimationState(): string {
    return localStorage.getItem(this.animationEnabledKey) || this.animationEnabled.toString();
  }

  getSelectedAnimation(): boolean {
    const animationState = localStorage.getItem(this.animationEnabledKey);
    return animationState !== null ? JSON.parse(animationState) : this.animationEnabled;
  }

  getScrollSnapState(): boolean {
    const scrollSnapState = localStorage.getItem(this.scrollSnapEnabledKey);
    return scrollSnapState !== null ? (scrollSnapState === 'true') : this.scrollSnapEnabled;
  }


  setTheme(theme: string) {
    this.selectedTheme = theme;
    this.document.body.classList.remove('dark-mode', 'light-mode');
    this.document.body.classList.add(`${theme}-mode`);
    localStorage.setItem(this.selectedThemeKey, theme);
  }

  toggleBoxAnimation(animationState: boolean) {
    this.animationEnabled = animationState;
    localStorage.setItem(this.animationEnabledKey, animationState.toString());
    const sections = this.document.querySelectorAll('section:not(.exclude-conic-animation)');
    sections.forEach((section: HTMLElement) => {
      if (animationState) {
        this.originalBoxShadows[section.id] = getComputedStyle(section).getPropertyValue('box-shadow');
        section.classList.add('conic');
        section.style.boxShadow = 'none';
      } else {
        const currentTheme = this.getCurrentTheme();
        section.classList.remove('conic');
        section.style.boxShadow = this.originalBoxShadows[section.id];
      }
    });
  }

  applyScrollSnap(scrollSnapState: boolean) {
    this.scrollSnapEnabled = scrollSnapState;
    localStorage.setItem(this.scrollSnapEnabledKey, scrollSnapState.toString());

    if (scrollSnapState) {
      document.documentElement.style.scrollSnapType = 'y mandatory';
    } else {
      document.documentElement.style.scrollSnapType = 'none';
    }
  }

  getCurrentTheme(): string {
    return this.selectedTheme;
  }

  updateLocalStorageTheme(theme: string) {
    localStorage.setItem(this.selectedThemeKey, theme);
  }
}
