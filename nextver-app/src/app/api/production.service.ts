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

@Injectable({
  providedIn: 'root'
})
export class ProductionService {

  private readonly url: string;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.url = environment.baseUrl;
  }

  public getCurrentProductions(page: number, itemsPerPage: number, category: string): Observable<PaginatedResult<Array<ProductionDto>>> {
    const apiPath = this.getApiPath(category);
    const parameters = {
      pageNumber: page.toString(),
      pageSize: itemsPerPage.toString(),
    };

    const apiUrl = this.url + apiPath;
    return this.http.get<any>(apiUrl, { observe: 'response' })
      .pipe(map((response: any) => {
        const result = new PaginatedResult<Array<ProductionDto>>();
        result.result = response.body;
        if (response.headers.get('pagination') !== null) {
          result.pagination = JSON.parse(response.headers.get('pagination') as string);
        }
        return result;
      }));
  }

  public getNumberOfProductions(category: string): Observable<ProductionCountDto> {
    const apiPath = this.getApiPath(category);
    const countUrl = this.url + apiPath + '/count';

    return this.http.get<ProductionCountDto>(countUrl)
      .pipe(map((responseData: ProductionCountDto) => responseData));
  }

  private getApiPath(category: string): string {
    switch (category) {
      case 'movies':
        return ApiPaths.Movie;
      case 'games':
        return ApiPaths.Game;
      case 'series':
        return ApiPaths.TvShow;
      default:
        return '';
    }
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
