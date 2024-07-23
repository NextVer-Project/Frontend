import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { ApiPaths, environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { UniverseForEditDto } from './dtos/universe-for-edit.dto';
import { UniverseForAddDto } from './dtos/universe-for-add.dto';
import { UniverseForListDto } from './dtos/universe-for-list.dto';

@Injectable({
  providedIn: 'root'
})
export class UniverseService {

  private readonly url: string;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.url = environment.baseUrl + ApiPaths.Universe;
  }

  public CreateUniverse(universe: UniverseForAddDto): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}`
    });

    return this.http.post(this.url, universe, { headers }).pipe(catchError(this.handleError));
  }

  getUniverses(): Observable<Array<UniverseForEditDto>> {
    const apiUrl = `${this.url}`;
    return this.http.get<Array<UniverseForEditDto>>(apiUrl);
  }

  searchUniverses(query: string): Observable<UniverseForListDto[]> {

    return this.http.get<UniverseForListDto[]>(`${this.url}/search?name=${query}`);
  }

  public edit(universeForEdit: UniverseForEditDto): Observable<UniverseForEditDto> {
    const apiUrl = this.url + '/edit';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}`
    });

    return this.http.patch<UniverseForEditDto>(apiUrl, universeForEdit, { headers })
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
