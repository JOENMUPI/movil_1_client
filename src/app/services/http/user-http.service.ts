import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/interfaces/user.model';
import { Pass } from 'src/app/interfaces/pass.model';
import { LoginUser } from 'src/app/interfaces/login-user.model';


@Injectable({
  providedIn: 'root'
})
export class UserHttpService {
  private url = 'http://localhost:8000/user/';
  private urlx = 'https://server-movil-1.herokuapp.com/user/';
  private requestOptions = { headers: { 'Content-Type': 'application/json' } }

  constructor(
    private http: HttpClient
  ) { 

  }

  public logout() {
    return this.http.get(this.url + 'singout', this.requestOptions).toPromise();
  }

  public getUserById() {
    return this.http.get(this.url + sessionStorage.user.id, this.requestOptions).toPromise();
  }

  public login(data: LoginUser) { 
    return this.http.post(this.url + 'singin', data, this.requestOptions).toPromise();
  }

  public register(user: User, pass: Pass) {
    return this.http.post(this.url + 'singup', { user, pass }, this.requestOptions).toPromise();
  }

  public updatePass(data: Pass) {
    return this.http.put(this.url + `pass/${ sessionStorage.user.id }`, data, this.requestOptions).toPromise();
  }
  
  public updateUser(data: User) {
    return this.http.put(this.url + sessionStorage.user.id, data, this.requestOptions).toPromise;
  }

  public deleteUser(id: string) {
    return this.http.delete(this.url + id, this.requestOptions).toPromise;
  } 
}
