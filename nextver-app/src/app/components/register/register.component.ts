import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../../api/auth.service';
import { UIPresentationConfigService } from '../../services/ui-presentation-config.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public isFetching = false;
  formSubmitted: boolean = false;
  notificationsAgreement: boolean = false;

  constructor(private authService: AuthService, public router: Router,
    private toastr: ToastrService, private uiPresentationConfigService: UIPresentationConfigService) { }

  get selectedTheme() {
    return this.uiPresentationConfigService.getSelectedTheme();
  }

  changeTheme(theme: string) {
    this.uiPresentationConfigService.setTheme(theme);
  }


  onSubmit(form: NgForm): void {
    this.formSubmitted = true;

    if (!form.valid) {
      return;
    }
    const username = form.value.username;
    const password = form.value.password;
    const email = form.value.email;
    const firstName = form.value.firstName;
    const lastName = form.value.lastName;
    const city = form.value.city;
    const country = form.value.country;
    const notificationsAgreement = form.value.notificationsAgreement;

    this.isFetching = true;

    this.authService.register(username, password, email, firstName, lastName, city, country, notificationsAgreement).subscribe(
      resData => {
        console.log(resData);
        this.toastr.success('Your account has been created!', 'Success!');
        this.router.navigate(['/login']);
        this.isFetching = false;
      },
      errorMessage => {
        console.log(errorMessage);
        this.toastr.error(errorMessage, 'Error');
        this.isFetching = false;
      }
    );
  }
}
