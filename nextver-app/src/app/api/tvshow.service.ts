import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { ApiPaths, environment } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { PaginatedResult } from './dtos/pagination';
import { AuthService } from './auth.service';
import { ReleasePlaceService } from './release-place.service';
import { TvShowForAddDto } from "./dtos/tvShow-for-add.dto";
import { TvShowDetailsDto } from './dtos/tvShow-details.dto';
import { GenreForEditDto } from './dtos/genre-for-edit.dto';
import { UniverseForEditDto } from './dtos/universe-for-edit.dto';
import { ReleasePlaceForEditDto } from './dtos/release-place-for-edit.dto';
import { TvShowDto } from './dtos/tvshow.dto';

@Injectable({
  providedIn: 'root'
})
export class TvShowService {

  private readonly url: string;

  constructor(private http: HttpClient, private authService: AuthService, private releasePlace: ReleasePlaceService) {
    this.url = environment.baseUrl + ApiPaths.TvShow;
  }

  public getCurrentTvShows(page: number, itemsPerPage: number): Observable<PaginatedResult<Array<TvShowDto>>> {
    const parameters = {
      pageNumber: page.toString(),
      pageSize: itemsPerPage.toString()
    };

    return this.http.get<any>(this.url, { observe: 'response', params: parameters })
      .pipe(map((response: any) => {
        const result = new PaginatedResult<Array<TvShowDto>>();
        result.result = response.body;
        if (response.headers.get('pagination') !== null) {
          result.pagination = JSON.parse(response.headers.get('pagination') as string);
        }
        return result;
      }));
  }

  public addTvShows(tvShow: TvShowForAddDto): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}`
    });

    return this.http.post(this.url, tvShow, { headers }).pipe(catchError(this.handleError));
  }

  getTvShowDetails(id: number): Observable<TvShowDetailsDto> {
    const apiUrl = `${this.url}/tvShows/${id}`;
    return this.http.get<TvShowDetailsDto>(apiUrl);
  }

  getTvShowGenres(tvShowId: number): Observable<Array<GenreForEditDto>> {
    const apiUrl = `${this.url}/${tvShowId}/genres`;

    return this.http.get<Array<GenreForEditDto>>(apiUrl).pipe(
      map((responseData: Array<GenreForEditDto>) => responseData));
  }

  getTvShowUniverses(tvShowId: number): Observable<Array<UniverseForEditDto>> {
    const apiUrl = `${this.url}/${tvShowId}/universes`;

    return this.http.get<Array<UniverseForEditDto>>(apiUrl).pipe(
      map((responseData: Array<UniverseForEditDto>) => responseData));
  }

  getTvShowReleasePlace(tvShowId: number): Observable<Array<ReleasePlaceForEditDto>> {
    const apiUrl = `${this.url}/${tvShowId}/releasePlaces`;

    return this.http.get<Array<ReleasePlaceForEditDto>>(apiUrl).pipe(
      map((responseData: Array<ReleasePlaceForEditDto>) => responseData));
  }

  getTvShowTrailerUrl(tvShowId: number): Observable<string> {
    const apiUrl = `${this.url}/${tvShowId}/trailer`;

    return this.http.get(apiUrl, { responseType: 'text' }).pipe(
      map((responseData: string) => responseData));;
  }

  public CreateTvShow(tvShow: TvShowForAddDto): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}`
    });

    return this.http.post(this.url, tvShow, { headers }).pipe(catchError(this.handleError));
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
