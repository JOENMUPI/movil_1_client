import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TypeInputHttpService {
  private url = 'http://localhost:8000/ti/';
  private urlx = 'https://server-movil-1.herokuapp.com/ti/';
  private requestOptions = { headers: { 'Content-Type': 'application/json' } }

  constructor(
    private http: HttpClient
  ) { 

  }

  public getAllTypes() {
    return this.http.get(this.url + sessionStorage.id, this.requestOptions).toPromise();
  }
}
