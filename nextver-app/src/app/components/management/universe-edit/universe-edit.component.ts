import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../api/auth.service';
import { UniverseForEditDto } from '../../../api/dtos/universe-for-edit.dto';
import { UniverseForListDto } from '../../../api/dtos/universe-for-list.dto';
import { MovieForEditDto } from '../../../api/dtos/movie-for-edit.dto';
import { MovieForListDto } from '../../../api/dtos/movie-for-list.dto';
import { MovieService } from '../../../api/movie.service';
import { UniverseService } from '../../../api/universe.service';
import { UserService } from '../../../api/user.service';
import { Privileges } from '../../../enums/privileges.enum';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-universe-edit',
  templateUrl: './universe-edit.component.html',
  styleUrls: ['./universe-edit.component.css']
})
export class UniverseEditComponent implements OnInit {
  public isFetching = false;
  public loggedUser: User | undefined;
  public universes: Array<UniverseForListDto> | undefined;
  public id: number | undefined;
  public searchQuery: string = '';
  public searchResults: UniverseForListDto[] = [];
  public expanded: boolean = false;

  public editForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    logoUrl: new FormControl(''),
  });
  public universeTitles: string[] = [];

  constructor(private universeService: UniverseService, private userService: UserService, public router: Router, private authService: AuthService) {
    this.authService.currentUser$.subscribe(user => {
      this.loggedUser = user;
    });
  }

  ngOnInit(): void {
    this.getUniverses();
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

    const universe_: UniverseForEditDto = {
      // @ts-ignore
      id: this.id,
      name: form.controls['name'].value,
      description: form.controls['description'].value,
      logoUrl: form.controls['logoUrl'].value
    }
    this.isFetching = true;

    this.universeService.edit(universe_).subscribe(
      resData => {
        console.log('The universe information has been updated!', 'Success!');
        this.isFetching = false;
      },
      errorMessage => {
        console.log(errorMessage, 'Error');
        this.isFetching = false;
      }
    );
  }

  public setUniverse(event: any): void {
    if (event.target.value > -1) {
      // @ts-ignore
      this.setValues(this.universes[event.target.value]);
    }
  }

  public setValues(universe: any): void {
    this.editForm.setValue({
      name: universe.name,
      description: universe.description,
      logoUrl: universe.logoUrl,
    });

    this.id = universe.id;
  }

  private getUniverses(): void {
    this.universeService.getUniverses().subscribe((universe: Array<UniverseForListDto>) => {
      this.universes = universe;
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

  searchUniverse(searchText: string) {
    console.log('Searching for:', this.searchQuery); 
    if (searchText.length > 2) {
      this.universeService.searchUniverses(searchText).subscribe(
        (results: UniverseForListDto[]) => {
          console.log('Search results:', results); 
          this.searchResults = results;
        },
        error => {
          console.error('There was an error while searching for universes:', error);
        }
      );
    } else {
      this.searchResults = [];
    }
  }

  onSearch(): void {
    console.log('Searching for:', this.searchQuery); 
    if (this.searchQuery.length > 2) {
      this.universeService.searchUniverses(this.searchQuery).subscribe(
        (results: UniverseForListDto[]) => {
          console.log('Search results:', results); 
          this.searchResults = results;
        },
        error => {
          console.error('There was an error while searching for universes:', error);
        }
      );
    } else {
      this.searchResults = [];
    }
  }
}
