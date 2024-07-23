import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../api/auth.service';
import { GenreForEditDto } from '../../../api/dtos/genre-for-edit.dto';
import { GenreForListDto } from '../../../api/dtos/genre-for-list.dto';
import { MovieForEditDto } from '../../../api/dtos/movie-for-edit.dto';
import { MovieForListDto } from '../../../api/dtos/movie-for-list.dto';
import { UniverseForEditDto } from '../../../api/dtos/universe-for-edit.dto';
import { GenreService } from '../../../api/genre.service';
import { MovieService } from '../../../api/movie.service';
import { UniverseService } from '../../../api/universe.service';
import { UserService } from '../../../api/user.service';
import { Privileges } from '../../../enums/privileges.enum';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-genre-edit',
  templateUrl: './genre-edit.component.html',
  styleUrls: ['./genre-edit.component.css']
})

export class GenreEditComponent implements OnInit {
  public isFetching = false;
  public loggedUser: User | undefined;
  public genres: Array<GenreForListDto> | undefined;
  public id: number | undefined;
  public searchQuery: string = '';
  public searchResults: GenreForListDto[] = [];
  public expanded: boolean = false;

  public editForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
  });
  public genreTitles: string[] = [];

  constructor(private genreService: GenreService, private userService: UserService, public router: Router, private authService: AuthService) {
    this.authService.currentUser$.subscribe(user => {
      this.loggedUser = user;
    });
  }

  ngOnInit(): void {
    this.getGenres();
    this.redirect();
  }
  private redirect(): void {
    if (this.loggedUser === undefined || this.loggedUser.role === Privileges.user) {
      this.router.navigate(['/']);
    }
  }

  onSubmit(form: FormGroup): void {
    if (!form.valid) {
      return;
    }

    this.isFetching = true;

    const genre_: GenreForEditDto = {
      // @ts-ignore
      id: this.id,
      name: form.controls['name'].value,
      description: form.controls['description'].value
    }
    this.isFetching = true;

    this.genreService.edit(genre_).subscribe(
      resData => {
        console.log('The genre information has been updated!', 'Success!');
        this.isFetching = false;
      },
      errorMessage => {
        console.log(errorMessage, 'Error');
        this.isFetching = false;
      }
    );
  }

  public setGenre(event: any): void {
    if (event.target.value > -1) {
      // @ts-ignore
      this.setValues(this.genres[event.target.value]);
    }
  }

  public setValues(genre: any): void {
    this.editForm.setValue({
      name: genre.name,
      description: genre.description,
    });

    this.id = genre.id;
  }

  private getGenres(): void {
    this.genreService.getGenres().subscribe((genre: Array<GenreForListDto>) => {
      this.genres = genre;
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

  searchGenre(searchText: string) {
    console.log('Searching for:', this.searchQuery);
    if (searchText.length > 2) {
      this.genreService.searchGenres(searchText).subscribe(
        (results: GenreForListDto[]) => {
          console.log('Search results:', results);
          this.searchResults = results;
          
        },
        error => {
          console.error('There was an error while searching for genres:', error);
        }
      );
    } else {
      this.searchResults = [];
    }
  }

  onSearch(): void {
    console.log('Searching for:', this.searchQuery);
    if (this.searchQuery.length > 2) {
      this.genreService.searchGenres(this.searchQuery).subscribe(
        (results: GenreForListDto[]) => {
          console.log('Search results:', results);
          this.searchResults = results;
        },
        error => {
          console.error('There was an error while searching for genres:', error);
        }
      );
    } else {
      this.searchResults = [];
    }
  }
}
