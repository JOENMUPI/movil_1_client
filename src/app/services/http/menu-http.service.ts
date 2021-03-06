import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MenuHttpService {
  private urlx = 'http://localhost:8000/menu/';
  private url = 'https://server-movil-1.herokuapp.com/menu/';
  private requestOptions = { headers: { 'Content-Type': 'application/json' } }

  constructor(
    private http: HttpClient
  ) { }
  
  public getMenus() {
    return this.http.get(this.url, this.requestOptions).toPromise();
  }

  public getMenusById(data) {  
    return this.http.get(this.url + data, this.requestOptions).toPromise();
  }

  public newMenu(data) { 
    return this.http.post(this.url, data, this.requestOptions).toPromise();
  }

  public deleteMenu(menuId) {
    return this.http.delete(this.url + `${ sessionStorage.id }/${ menuId }`).toPromise();
  }
}
