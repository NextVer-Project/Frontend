import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../api/auth.service';
import { UIPresentationConfigService } from '../../services/ui-presentation-config.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public isFetching = false;

  constructor(private authService: AuthService, public router: Router, private uiPresentationConfigService: UIPresentationConfigService) { }

  get selectedTheme() {
    return this.uiPresentationConfigService.getSelectedTheme();
  }

  changeTheme(theme: string) {
    this.uiPresentationConfigService.setTheme(theme);
  }


  onSubmit(form: NgForm): void {
    if (!form.valid) {
      return;
    }
    const username = form.value.username;
    const password = form.value.password;
    const email = form.value.email;

    this.isFetching = true;

    this.authService.register(username, password, email).subscribe(
      resData => {
        console.log(resData);
        this.router.navigate(['/login']);
        this.isFetching = false;
      },
      errorMessage => {
        console.log(errorMessage);
        this.isFetching = false;
      }
    );
  }
}
