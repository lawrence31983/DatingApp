import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import {JwtHelperService} from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { User } from '../_models/User';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseURL =  environment.apiURL + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: User;
  photoURL = new BehaviorSubject<string>('../../assets/user.png');
  currentPhotoUrl = this.photoURL.asObservable();

constructor(private http: HttpClient) { }

changeMemberPhoto(_photoUrl: string) {
  this.photoURL.next(_photoUrl);
}

login(model: any) {
  return this.http.post(this.baseURL + 'login', model)
    .pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          localStorage.setItem('user', JSON.stringify(user.user));
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          this.currentUser = user.user;
          this.changeMemberPhoto(this.currentUser.photoURL);
          console.log(this.decodedToken);
        }
      })
    );
}

register(user: User) {
  return this.http.post(this.baseURL + 'register', user);
}

loggedIn() {
  const token = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token);
}
}
