import { Injectable } from '@angular/core';
import { ApiPaths, environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { UserForDetailsDto } from './dtos/user-for-details.dto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly url: string;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.url = environment.baseUrl + ApiPaths.User;
  }

  public getUserDetails(): Observable<UserForDetailsDto> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}`
    });

    return this.http.get<UserForDetailsDto>(this.url, { headers }).pipe(
      map((responseData: UserForDetailsDto) => responseData));
  }
}
