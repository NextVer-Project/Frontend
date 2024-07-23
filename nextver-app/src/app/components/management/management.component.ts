import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { Router } from '@angular/router';
import { AuthService } from '../../api/auth.service';
import { Privileges } from '../../enums/privileges.enum';
import { UIPresentationConfigService } from '../../services/ui-presentation-config.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {
  public user: User | undefined;

  constructor(public router: Router, private authService: AuthService, private uiPresentationConfigService: UIPresentationConfigService) {
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
    });
  }

  get selectedTheme() {
    return this.uiPresentationConfigService.getSelectedTheme();
  }

  ngOnInit(): void {
    this.redirect();
  }

  private redirect(): void {
    if (this.user === undefined || this.user.role === Privileges.user) {
      this.router.navigate(['/']);
    }
  }
}
