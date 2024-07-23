import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../api/auth.service';
import { GenreForEditDto } from '../../../api/dtos/genre-for-edit.dto';
import { MovieForEditDto } from '../../../api/dtos/movie-for-edit.dto';
import { MovieForListDto } from '../../../api/dtos/movie-for-list.dto';
import { MovieQualityVersionDetailsDto } from '../../../api/dtos/movie-quality-version-details.dto';
import { ReleasePlaceForEditDto } from '../../../api/dtos/release-place-for-edit.dto';
import { UniverseForEditDto } from '../../../api/dtos/universe-for-edit.dto';
import { GenreService } from '../../../api/genre.service';
import { MovieService } from '../../../api/movie.service';
import { ReleasePlaceService } from '../../../api/release-place.service';
import { UniverseService } from '../../../api/universe.service';
import { UserService } from '../../../api/user.service';
import { Privileges } from '../../../enums/privileges.enum';
import { User } from '../../../interfaces/user';
import { ReleasePlaceEditComponent } from '../release-place-edit/release-place-edit.component';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})

export class MovieEditComponent implements OnInit {
  public isFetching = false;
  public loggedUser: User | undefined;
  public movies: Array<MovieForListDto> | undefined;
  public id: number | undefined;
  public searchQuery: string = '';
  public searchResults: MovieForListDto[] = [];
  public expanded: boolean = false;
  public movieVersionsDetails: Array<MovieQualityVersionDetailsDto> | undefined;
  public universes: Array<UniverseForEditDto> | undefined;
  public genres: Array<GenreForEditDto> | undefined;
  public releasePlaces: Array<ReleasePlaceForEditDto> | undefined;
  selectedGenres: number[] = [];
  selectedUniverses: number[] = [];
  selectedMovieVersions: number[] = [];
  selectedReleasePlaces: number[] = [];

  public editForm = new FormGroup({
    title: new FormControl(''),
    releaseDate: new FormControl(''),
    runtime: new FormControl(''),
    description: new FormControl(''),
    movieCoverUrl: new FormControl(''),
    movieTrailerUrl: new FormControl(''),
  });
  public movieTitles: string[] = [];

  constructor(private movieService: MovieService, private userService: UserService,
    public router: Router, private authService: AuthService,
    private universeService: UniverseService, private genreService: GenreService,
    private releasePlaceService: ReleasePlaceService, private toastr: ToastrService) {
    this.authService.currentUser$.subscribe(user => {
      this.loggedUser = user;
    });
  }

  ngOnInit(): void {
    this.getMovies();
    this.redirect();
    this.getAllUniverses();
    this.getAllGenres();
    this.getAllMovieVersions();
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
          console.error('There was an error while loading movie universes details:', error);
        });
  }

  private getAllGenres(): void {
    this.genreService.getGenres()
      .subscribe((response: Array<GenreForEditDto>) => {
        this.genres = response;
      },
        error => {
          console.error('There was an error while loading movie universes details:', error);
        });
  }

  private getAllMovieVersions(): void {
    this.releasePlaceService.getReleasePlaces()
      .subscribe((response: Array<ReleasePlaceForEditDto>) => {
        this.releasePlaces = response;
      },
        error => {
          console.error('There was an error while loading ReleasePlaceForEditDto details:', error);
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
    } else if (type === 'movieVersion') {
      const index = this.selectedMovieVersions.indexOf(id);
      if (index > -1) {
        this.selectedMovieVersions.splice(index, 1);
      } else {
        this.selectedMovieVersions.push(id);
      }
    }
  }

  onSubmit(form: FormGroup): void {
    if (!form.valid) {
      return;
    }

    this.isFetching = true;

    const movie_: MovieForEditDto = {
      // @ts-ignore
      id: this.id,
      title: form.controls['title'].value,
      releaseDate: form.controls['releaseDate'].value,
      runtime: form.controls['runtime'].value,
      description: form.controls['description'].value,
      coverUrl: form.controls['movieCoverUrl'].value,
      trailerUrl: form.controls['movieTrailerUrl'].value,
      genreIds: this.selectedGenres,
      universeIds: this.selectedUniverses,
      movieVersionsIds: this.selectedMovieVersions,
    }
    this.isFetching = true;

    this.movieService.edit(movie_).subscribe(
      resData => {
        this.toastr.success(`The movie: ,,${movie_.title}'' information has been!`, 'Success!');
        this.isFetching = false;
      },
      errorMessage => {
        this.toastr.error('There was an error while editing movie.', errorMessage);      
        console.log(errorMessage, 'Error');
        this.isFetching = false;
      }
    );
  }

  public setMovie(event: any): void {
    if (event.target.value > -1) {
      // @ts-ignore
      this.setValues(this.movies[event.target.value]);
    }
  }

  public setValues(movie: any): void {
    this.editForm.setValue({
      title: movie.title,
      releaseDate: movie.releaseDate,
      runtime: movie.runtime,
      description: movie.description,
      movieCoverUrl: movie.coverUrl,
      movieTrailerUrl: movie.trailerUrl,
    });

    this.movieService.getMovieGenres(movie.id).subscribe(
      (genres: GenreForEditDto[]) => {
        this.selectedGenres = genres.map(genre => genre.id);
      },
      (error) => {
        console.error('Error fetching movie genres:', error);
      }
    );

    this.movieService.getMovieUniverses(movie.id).subscribe(
      (universes: UniverseForEditDto[]) => {
        this.selectedUniverses = universes.map(universe => universe.id);
      },
      (error) => {
        console.error('Error fetching movie universes:', error);
      }
    );

    this.movieService.getMovieReleasePlace(movie.id).subscribe(
      (releasePlaces: ReleasePlaceForEditDto[]) => {
        this.selectedMovieVersions = releasePlaces.map(releasePlace => releasePlace.id);
      },
      (error) => {
        console.error('Error fetching movie versions:', error);
      }
    );
    this.id = movie.id;
  }

  private getMovies(): void {
    this.movieService.getMovies().subscribe((movie: Array<MovieForListDto>) => {
      this.movies = movie;
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

  searchMovie(searchText: string) {
    console.log('Searching for:', this.searchQuery); 
    if (searchText.length > 2) {
      this.movieService.searchMovies(searchText).subscribe(
        (results: MovieForListDto[]) => {
          console.log('Search results:', results); 
          this.searchResults = results;
        },
        error => {
          console.error('There was an error while searching for movies:', error);
        }
      );
    } else {
      this.searchResults = [];
    }
  }

  onSearch(): void {
    console.log('Searching for:', this.searchQuery);
    if (this.searchQuery.length > 2) {
      this.movieService.searchMovies(this.searchQuery).subscribe(
        (results: MovieForListDto[]) => {
          console.log('Search results:', results);
          this.searchResults = results;
        },
        error => {
          console.error('There was an error while searching for movies:', error);
        }
      );
    } else {
      this.searchResults = [];
    }
  }
}
