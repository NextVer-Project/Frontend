import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../api/auth.service';
import { User } from '../../../interfaces/user';
import { FormGroup, NgForm } from "@angular/forms";
import { TvShowForAddDto } from "../../../api/dtos/tvShow-for-add.dto";
import { TvShowService } from "../../../api/tvShow.service";
import { Privileges } from "../../../enums/privileges.enum";
import { UniverseForAddDto } from '../../../api/dtos/universe-for-add.dto';
import { UniverseForEditDto } from '../../../api/dtos/universe-for-edit.dto';
import { UniverseService } from '../../../api/universe.service';
import { GenreService } from '../../../api/genre.service';
import { GenreForEditDto } from '../../../api/dtos/genre-for-edit.dto';


@Component({
  selector: 'app-tvshow-add',
  templateUrl: './tvshow-add.component.html',
  styleUrls: ['./tvshow-add.component.css']
})
export class TvshowAddComponent implements OnInit {
  public user: User | undefined;
  public isFetching = false;
  public universes: Array<UniverseForEditDto> | undefined;
  public genres: Array<GenreForEditDto> | undefined;
  selectedGenres: number[] = [];
  selectedUniverses: number[] = [];

  constructor(public router: Router, private authService: AuthService,
    private tvShowService: TvShowService, private universeService: UniverseService, private genreService: GenreService) {
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    this.redirect();
    this.getAllUniverses();
    this.getAllGenres();
  }

  private redirect(): void {
    if (this.user === undefined || this.user.role === Privileges.user) {
      this.router.navigate(['/']);
    }
  }

  private getAllUniverses(): void {
    this.universeService.getUniverses()
      .subscribe((response: Array<UniverseForEditDto>) => {
        this.universes = response;
      },
        error => {
          console.error('There was an error while loading tvShow universes details:', error);
        });
  }

  private getAllGenres(): void {
    this.genreService.getGenres()
      .subscribe((response: Array<GenreForEditDto>) => {
        this.genres = response;
      },
        error => {
          console.error('There was an error while loading tvShow universes details:', error);
        });
  }
  private fetchGenres(): void {
    this.genreService.getGenres().subscribe(genres => {
      this.genres = genres;
    });
  }

  private fetchUniverses(): void {
    this.universeService.getUniverses().subscribe(universes => {
      this.universes = universes;
    });
  }

  toggleSelection(id: number, type: string): void {
    if (type === 'genre') {
      const index = this.selectedGenres.indexOf(id);
      if (index > -1) {
        this.selectedGenres.splice(index, 1);
      } else {
        this.selectedGenres.push(id);
      }
    } else if (type === 'universe') {
      const index = this.selectedUniverses.indexOf(id);
      if (index > -1) {
        this.selectedUniverses.splice(index, 1);
      } else {
        this.selectedUniverses.push(id);
      }
    }
  }

  public onSubmit(form: NgForm): void {
    const tvShow: TvShowForAddDto = {
      title: form.value.title,
      releaseDate: new Date(form.value.releaseDate),
      runtime: form.value.runtime,
      description: form.value.description,
      coverUrl: form.value.tvShowCoverUrl,
      trailerUrl: form.value.tvShowTrailerUrl,
      genreIds: this.selectedGenres,
      universeIds: this.selectedUniverses
    };

    this.isFetching = true;

    this.tvShowService.CreateTvShow(tvShow).subscribe(() => {

      this.isFetching = false;
    }, errorMsg => {
      console.error('There was an error while loading tvShow genres details:', errorMsg);

      this.isFetching = false;
    });
  }
}
