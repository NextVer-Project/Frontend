import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { TvShowDto } from './dtos/tvshow.dto';
import { MovieDto } from './dtos/movie.dto';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { ApiPaths, environment } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { PaginatedResult } from './dtos/pagination';
import { AuthService } from './auth.service';
import { ProductionCountDto } from "./dtos/production-count.dto";
import { ProductionDto } from './dtos/production.dto';
import { ReleasePlaceForEditDto } from './dtos/release-place-for-edit.dto';
import { ProductionTypeForEditDto } from './dtos/production-type-for-edit.dto';
import { TechnologyForEditDto } from './dtos/technology-for-edit.dto';

@Injectable({
  providedIn: 'root'
})
export class TechnologyService {

  private readonly url: string;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.url = environment.baseUrl + ApiPaths.Technology;
  }

  getTechnologyDetails(technologyId: number): Observable<TechnologyForEditDto> {
    const apiUrl = `${this.url}/${technologyId}/details`;
    return this.http.get<TechnologyForEditDto>(apiUrl);
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
