import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../../api/auth.service';
import { Router } from '@angular/router';
import { UIPresentationConfigService } from '../../services/ui-presentation-config.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public isFetching = false;

  constructor(private authService: AuthService, public router: Router,
    private uiPresentationConfigService: UIPresentationConfigService,
    private toastr: ToastrService,) { }

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

    this.isFetching = true;

    this.authService.login(username, password).subscribe(
      resData => {
        this.toastr.success('Your are now logged in!', 'Success!');
        this.router.navigate(['/']);
        this.isFetching = false;
      },
      errorMessage => {
        this.toastr.error(errorMessage, 'Error');
        this.isFetching = false;
      }
    );
  }
}
