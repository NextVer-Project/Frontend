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
import { GenreService } from '../../../api/genre.service';
import { GenreForEditDto } from '../../../api/dtos/genre-for-edit.dto';
import { GenreForAddDto } from '../../../api/dtos/genre-for-add.dto';

@Component({
  selector: 'app-genre-add',
  templateUrl: './genre-add.component.html',
  styleUrls: ['./genre-add.component.css']
})
export class GenreAddComponent implements OnInit {
  public user: User | undefined;
  public isFetching = false;

  constructor(public router: Router, private authService: AuthService,
    private genreService: GenreService) {
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
    const genre: GenreForAddDto = {
      name: form.value.name,
      description: form.value.description,
    };

    this.isFetching = true;

    this.genreService.CreateGenre(genre).subscribe(() => {

      this.isFetching = false;
    }, errorMsg => {
      console.error('There was an error while loading genres details:', errorMsg);

      this.isFetching = false;
    });
  }
}
