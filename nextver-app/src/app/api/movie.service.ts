import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { MovieDto } from './dtos/movie.dto';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { ApiPaths, environment } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { PaginatedResult } from './dtos/pagination';
import { AuthService } from './auth.service';
import { ReleasePlaceService } from './release-place.service';
import { MovieForAddDto } from "./dtos/movie-for-add.dto";
import { MovieCountDto } from "./dtos/movie-count.dto";
import { MovieDetailsDto } from './dtos/movie-details.dto';
import { GenreForEditDto } from './dtos/genre-for-edit.dto';
import { UniverseForEditDto } from './dtos/universe-for-edit.dto';
import { ReleasePlaceForEditDto } from './dtos/release-place-for-edit.dto';
import { MovieQualityVersionDetailsDto } from './dtos/movie-quality-version-details.dto';
import { MovieForListDto } from './dtos/movie-for-list.dto';
import { MovieForEditDto } from './dtos/movie-for-edit.dto';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private readonly url: string;

  constructor(private http: HttpClient, private authService: AuthService, private releasePlace: ReleasePlaceService) {
    this.url = environment.baseUrl + ApiPaths.Movie;
  }

  public getCurrentMovies(page: number, itemsPerPage: number): Observable<PaginatedResult<Array<MovieDto>>> {
    const parameters = {
      pageNumber: page.toString(),
      pageSize: itemsPerPage.toString()
    };

    return this.http.get<any>(this.url, { observe: 'response', params: parameters })
      .pipe(map((response: any) => {
        const result = new PaginatedResult<Array<MovieDto>>();
        result.result = response.body;
        if (response.headers.get('pagination') !== null) {
          result.pagination = JSON.parse(response.headers.get('pagination') as string);
        }
        return result;
      }));
  }

  public addMovies(movie: MovieForAddDto): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}`
    });

    return this.http.post(this.url, movie, { headers }).pipe(catchError(this.handleError));
  }

  public GetNumberOfMovies(): Observable<MovieCountDto> {
    const apiUrl = this.url + '/count';

    return this.http.get<MovieCountDto>(apiUrl).pipe(
      map((responseData: MovieCountDto) => responseData));
  }

  getMovieDetails(id: number): Observable<MovieDetailsDto> {
    const apiUrl = `${this.url}/movies/${id}`;
    return this.http.get<MovieDetailsDto>(apiUrl);
  }

  getMovieGenres(movieId: number): Observable<Array<GenreForEditDto>> {
    const apiUrl = `${this.url}/${movieId}/genres`;

    return this.http.get<Array<GenreForEditDto>>(apiUrl).pipe(
      map((responseData: Array<GenreForEditDto>) => responseData));
  }

  getMovieUniverses(movieId: number): Observable<Array<UniverseForEditDto>> {
    const apiUrl = `${this.url}/${movieId}/universes`;

    return this.http.get<Array<UniverseForEditDto>>(apiUrl).pipe(
      map((responseData: Array<UniverseForEditDto>) => responseData));
  }

  getMovieReleasePlace(movieId: number): Observable<Array<ReleasePlaceForEditDto>> {
    const apiUrl = `${this.url}/${movieId}/releasePlaces`;

    return this.http.get<Array<ReleasePlaceForEditDto>>(apiUrl).pipe(
      map((responseData: Array<ReleasePlaceForEditDto>) => responseData));
  }

  getMovieTrailerUrl(movieId: number): Observable<string> {
    const apiUrl = `${this.url}/${movieId}/trailer`;

    return this.http.get(apiUrl, { responseType: 'text' }).pipe(
      map((responseData: string) => responseData));;
  }

  getMovieVersionQualityDetails(movieId: number): Observable<Array<MovieQualityVersionDetailsDto>> {
    const apiUrl = `${this.url}/${movieId}/details`;

    return this.http.get<Array<MovieQualityVersionDetailsDto>>(apiUrl).pipe(
      map((responseData: Array<MovieQualityVersionDetailsDto>) => responseData));
  }

  public CreateMovie(movie: MovieForAddDto): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}`
    });

    return this.http.post(this.url, movie, { headers }).pipe(catchError(this.handleError));
  }

  public getMovies(): Observable<Array<MovieForListDto>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}`
    });

    return this.http.get<Array<MovieForListDto>>(this.url, { headers }).pipe(

      map((responseData: Array<MovieForListDto>) => responseData));
  }

  public edit(movieForEdit: MovieForEditDto): Observable<MovieForEditDto> {
    const apiUrl = this.url + '/edit';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}`
    });

    return this.http.patch<MovieForEditDto>(apiUrl, movieForEdit, { headers })
      .pipe(catchError(this.handleError)
      );
  }

  searchMovies(query: string): Observable<MovieForListDto[]> {
    
    return this.http.get<MovieForListDto[]>(`${this.url}/search?title=${query}`);
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

  getMovieInfo(id: number): Observable<MovieDto> {
    const apiUrl = `${this.url}/${id}`;
    return this.http.get<MovieDto>(apiUrl);
  }
}
