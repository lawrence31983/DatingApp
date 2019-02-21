import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/User';




@Injectable({
  providedIn: 'root'
})
export class UserService {
baseUrl = environment.apiURL;
constructor(private http: HttpClient) { }

getUsers(): Observable<User[]> {
  return this.http.get<User[]>(this.baseUrl + 'users');
}

getUser(id: number): Observable<User> {
  return this.http.get<User>(this.baseUrl + 'users/' + id.toString());
}

updateUser(id: number, user: User) {
  return this.http.put(this.baseUrl + 'users/' + id.toString(), user);
}

setMainPhoto(userId: number, id: number){
  return this.http.put(this.baseUrl + 'users/' + userId.toString() + '/photos/' + id.toString() + '/setMain', {});
}

}
