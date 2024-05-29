import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, ReplaySubject, throwError } from 'rxjs';
import { ApiPaths, environment } from '../../environments/environment';
import { UserForLoginDto } from './dtos/user-for-login-dto';
import { User } from '../interfaces/user';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly url: string;
  private token: string;
  private user: User | undefined;
  private readonly helper: JwtHelperService;
  private currentUserSource = new ReplaySubject<User | undefined>(1);
  public currentUser$ = this.currentUserSource.asObservable();
  private selectedCategory: string;

  constructor(private http: HttpClient) {
    this.url = environment.baseUrl + ApiPaths.Auth;
    this.helper = new JwtHelperService();
    this.token = (localStorage.getItem('access_token') as string);
    this.setUserDetails();
  }

  login(username: string, password: string): Observable<UserForLoginDto> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const options = { headers };

    return this.http.post<UserForLoginDto>(
      this.url + '/login',
      { username, password },
      options
    ).pipe(
      map((response: UserForLoginDto) => {
        if (response) {
          localStorage.setItem('access_token', response.token);
          this.token = response.token;
          this.setUserDetails();
        }
      }),
      catchError(this.handleError)
    );
  }

  getToken(): string {
    return this.token;
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.currentUserSource.next(undefined);
  }

  register(username: string, password: string, email: string): Observable<any> {
    return this.http.post(this.url + '/register',
      {
        username,
        password,
        email
      }
    )
      .pipe(
        catchError(this.handleError)
      );
  }

  setUserDetails(): void {
    const decoded = this.helper.decodeToken(this.token);
    if (decoded === null || this.helper.isTokenExpired(this.token)) {
      if (this.user !== undefined) {  }
      this.user = undefined;
      return;
    }

    /*this.currentUserSource.next({
      id: parseInt(decoded.nameid, 10),
      name: decoded.unique_name,
      userType: {
        name: decoded.role,
        description: decoded.description || '',
        logoUrl: decoded.logoUrl || ''
      }
    });*/
    this.currentUserSource.next({
      id: parseInt(decoded.nameid, 10),
      name: decoded.unique_name,
      role: parseInt(decoded.role, 10)
    });
  }

  public setSelectedCategory(category: string): void {
    this.selectedCategory = category;
  }

  public getSelectedCategory(): string {
    return this.selectedCategory;
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
