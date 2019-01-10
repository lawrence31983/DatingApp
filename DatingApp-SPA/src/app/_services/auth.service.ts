import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import {JwtHelperService} from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseURL = 'http://localhost:5000/api/auth/';
  jwtHelper = new JwtHelperService();
  decoadedToken: any;
constructor(private http: HttpClient) { }

login(model: any) {
  return this.http.post(this.baseURL + 'login', model)
    .pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          this.decoadedToken = this.jwtHelper.decodeToken(user.token);
          console.log(this.decoadedToken);
        }
      })
    );
}

register(model: any) {
  return this.http.post(this.baseURL + 'register', model);
}

loggedIn() {
  const token = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token);
}
}
