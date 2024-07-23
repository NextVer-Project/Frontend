import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { ApiPaths, environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { GenreForEditDto } from './dtos/genre-for-edit.dto';
import { GenreForAddDto } from './dtos/genre-for-add.dto';
import { GenreForListDto } from './dtos/genre-for-list.dto';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  private readonly url: string;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.url = environment.baseUrl + ApiPaths.Genre;
  }

  public CreateGenre(genre: GenreForAddDto): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}`
    });

    return this.http.post(this.url, genre, { headers }).pipe(catchError(this.handleError));
  }

  getGenres(): Observable<Array<GenreForEditDto>> {
    const apiUrl = `${this.url}`;
    return this.http.get<Array<GenreForEditDto>>(apiUrl);
  }

  searchGenres(query: string): Observable<GenreForListDto[]> {

    return this.http.get<GenreForListDto[]>(`${this.url}/search?name=${query}`);
  }

  public edit(genreForEdit: GenreForEditDto): Observable<GenreForEditDto> {
    const apiUrl = this.url + '/edit';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}`
    });

    return this.http.patch<GenreForEditDto>(apiUrl, genreForEdit, { headers })
      .pipe(catchError(this.handleError)
      );
  }

  private handleError(errorRes: HttpErrorResponse): Observable<any> {
    let errorMessage = 'An unknown error occurred';

    switch (errorRes.status) {
      case 500:
        errorMessage = 'The server error occurred';
        break;
      case 400:
        errorMessage = errorRes.error;
        break;
      case 401:
        errorMessage = 'Wrong username or password';
        break;
    }
    return throwError(errorMessage);
  }
}
