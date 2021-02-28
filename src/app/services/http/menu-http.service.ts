import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MenuHttpService {
  private url = 'http://localhost:8000/menu/';
  private urlx = 'https://server-movil-1.herokuapp.com/menu/';
  private requestOptions = { headers: { 'Content-Type': 'application/json' } }

  constructor(
    private http: HttpClient
  ) { }
  
  public getMenus() {
    return this.http.get(this.url, this.requestOptions).toPromise();
  }

  public getMenusById(data) {
    return this.http.get(this.url + 'rec/' + data, this.requestOptions).toPromise();
  }
}
