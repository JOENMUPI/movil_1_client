import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GenderHttpService {
  private urlx = 'http://localhost:8000/gender/';
  private url = 'https://server-movil-1.herokuapp.com/gender/';
  private requestOptions = { headers: { 'Content-Type': 'application/json' } }
  
  constructor(
    private http: HttpClient
  ) { 

  }

  public getAllGenders() {
    return this.http.get(this.url, this.requestOptions).toPromise();
  }
}
