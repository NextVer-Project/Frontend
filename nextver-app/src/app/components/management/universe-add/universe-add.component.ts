import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../api/auth.service';
import { User } from '../../../interfaces/user';
import { FormGroup, NgForm } from "@angular/forms";
import { MovieForAddDto } from "../../../api/dtos/movie-for-add.dto";
import { MovieService } from "../../../api/movie.service";
import { Privileges } from "../../../enums/privileges.enum";
import { UniverseForAddDto } from '../../../api/dtos/universe-for-add.dto';
import { UniverseForEditDto } from '../../../api/dtos/universe-for-edit.dto';
import { UniverseService } from '../../../api/universe.service';

@Component({
  selector: 'app-universe-add',
  templateUrl: './universe-add.component.html',
  styleUrls: ['./universe-add.component.css']
})
export class UniverseAddComponent implements OnInit {
  public user: User | undefined;
  public isFetching = false;

  constructor(public router: Router, private authService: AuthService,
    private universeService: UniverseService) {
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    this.redirect();
  }

  private redirect(): void {
    if (this.user === undefined || this.user.role === Privileges.user) {
      this.router.navigate(['/']);
    }
  }

  public onSubmit(form: NgForm): void {
    const universe: UniverseForAddDto = {
      name: form.value.name,
      description: form.value.description,
      logoUrl: form.value.logoUrl,
    };

    this.isFetching = true;

    this.universeService.CreateUniverse(universe).subscribe(() => {

      this.isFetching = false;
    }, errorMsg => {
      console.error('There was an error while loading universes details:', errorMsg);

      this.isFetching = false;
    });
  }
}
