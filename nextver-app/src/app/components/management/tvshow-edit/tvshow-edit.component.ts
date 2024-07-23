import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../api/auth.service';
import { GenreForEditDto } from '../../../api/dtos/genre-for-edit.dto';
import { TvShowForEditDto } from '../../../api/dtos/tvshow-for-edit.dto';
import { TvShowForListDto } from '../../../api/dtos/tvshow-for-list.dto';
import { UniverseForEditDto } from '../../../api/dtos/universe-for-edit.dto';
import { GenreService } from '../../../api/genre.service';
import { TvShowService } from '../../../api/tvshow.service';
import { UniverseService } from '../../../api/universe.service';
import { UserService } from '../../../api/user.service';
import { Privileges } from '../../../enums/privileges.enum';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-tvshow-edit',
  templateUrl: './tvshow-edit.component.html',
  styleUrls: ['./tvshow-edit.component.css']
})

export class TvShowEditComponent implements OnInit {
  public isFetching = false;
  public loggedUser: User | undefined;
  public tvShows: Array<TvShowForListDto> | undefined;
  public id: number | undefined;
  public searchQuery: string = '';
  public searchResults: TvShowForListDto[] = [];
  public expanded: boolean = false;
  public universes: Array<UniverseForEditDto> | undefined;
  public genres: Array<GenreForEditDto> | undefined;
  selectedGenres: number[] = [];
  selectedUniverses: number[] = [];

  public editForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    tvShowCoverUrl: new FormControl(''),
    tvShowTrailerUrl: new FormControl(''),
  });
  public tvShowTitles: string[] = [];

  constructor(private tvShowService: TvShowService, private userService: UserService, public router: Router, private authService: AuthService,
    private universeService: UniverseService, private genreService: GenreService) {
    this.authService.currentUser$.subscribe(user => {
      this.loggedUser = user;
    });
  }

  ngOnInit(): void {
    this.getTvShows();
    this.redirect();
    this.getAllUniverses();
    this.getAllGenres();
  }
  private redirect(): void {
    if (this.loggedUser === undefined || this.loggedUser.role === Privileges.user) {
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

  onSubmit(form: FormGroup): void {
    if (!form.valid) {
      return;
    }

    this.isFetching = true;

    const tvShow_: TvShowForEditDto = {
      // @ts-ignore
      id: this.id,
      title: form.controls['title'].value,
      description: form.controls['description'].value,
      coverUrl: form.controls['tvShowCoverUrl'].value,
      trailerUrl: form.controls['tvShowTrailerUrl'].value,
      genreIds: this.selectedGenres,
      universeIds: this.selectedUniverses
    }
    this.isFetching = true;

    this.tvShowService.edit(tvShow_).subscribe(
      resData => {
        console.log('The tvShow information has been updated!', 'Success!');
        this.isFetching = false;
      },
      errorMessage => {
        console.log(errorMessage, 'Error');
        this.isFetching = false;
      }
    );
  }

  public setTvShow(event: any): void {
    if (event.target.value > -1) {
      // @ts-ignore
      this.setValues(this.tvShows[event.target.value]);
    }
  }

  public setValues(tvShow: any): void {
    this.editForm.setValue({
      title: tvShow.title,
      description: tvShow.description,
      tvShowCoverUrl: tvShow.coverUrl,
      tvShowTrailerUrl: tvShow.trailerUrl,
    });

    this.tvShowService.getTvShowGenres(tvShow.id).subscribe(
      (genres: GenreForEditDto[]) => {
        this.selectedGenres = genres.map(genre => genre.id);
      },
      (error) => {
        console.error('Error fetching tvShow genres:', error);
      }
    );

    this.tvShowService.getTvShowUniverses(tvShow.id).subscribe(
      (universes: UniverseForEditDto[]) => {
        this.selectedUniverses = universes.map(universe => universe.id);
      },
      (error) => {
        console.error('Error fetching tvShow universes:', error);
      }
    );
    this.id = tvShow.id;
  }

  private getTvShows(): void {
    this.tvShowService.getTvShows().subscribe((tvShow: Array<TvShowForListDto>) => {
      this.tvShows = tvShow;
    }, error => {
      console.log('An error occurred', 'Error');
    });
  }

  expandSearch(): void {
    this.expanded = true;
  }

  shrinkSearch(): void {
    setTimeout(() => {
      this.expanded = false;
    }, 200); 
  }

  searchTvShow(searchText: string) {
    console.log('Searching for:', this.searchQuery); 
    if (searchText.length > 2) {
      this.tvShowService.searchTvShows(searchText).subscribe(
        (results: TvShowForListDto[]) => {
          console.log('Search results:', results); 
          this.searchResults = results;
        },
        error => {
          console.error('There was an error while searching for tvShows:', error);
        }
      );
    } else {
      this.searchResults = [];
    }
  }

  onSearch(): void {
    console.log('Searching for:', this.searchQuery); 
    if (this.searchQuery.length > 2) {
      this.tvShowService.searchTvShows(this.searchQuery).subscribe(
        (results: TvShowForListDto[]) => {
          console.log('Search results:', results); 
          this.searchResults = results;
        },
        error => {
          console.error('There was an error while searching for tvShows:', error);
        }
      );
    } else {
      this.searchResults = [];
    }
  }
}
