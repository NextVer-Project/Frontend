import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { ApiPaths, environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { UniverseForEditDto } from './dtos/universe-for-edit.dto';

@Injectable({
  providedIn: 'root'
})
export class UniverseService {

  private readonly url: string;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.url = environment.baseUrl + ApiPaths.Universe;
  }

  getUniverses(): Observable<Array<UniverseForEditDto>> {
    const apiUrl = `${this.url}`;
    return this.http.get<Array<UniverseForEditDto>>(apiUrl);
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
