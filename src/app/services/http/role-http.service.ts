import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoleHttpService {
  private urlx = 'http://localhost:8000/role/';
  private url = 'https://server-movil-1.herokuapp.com/role/';
  private requestOptions = { headers: { 'Content-Type': 'application/json' } }
  
  constructor(
    private http: HttpClient
  ) { 

  }

  public authUser() {
    return this.http.get(this.url + sessionStorage.id, this.requestOptions).toPromise();
  }
}
