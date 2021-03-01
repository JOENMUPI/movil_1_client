import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoleHttpService {
  private url = 'http://localhost:8000/role/';
  private urlx = 'https://server-movil-1.herokuapp.com/role/';
  private requestOptions = { headers: { 'Content-Type': 'application/json' } }
  
  constructor(
    private http: HttpClient
  ) { 

  }

  public authUser() {
    return this.http.get(this.url + sessionStorage.id, this.requestOptions).toPromise();
  }
}
