import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FormHttpService {
  private url = 'http://localhost:8000/form/';
  private urlx = 'https://server-movil-1.herokuapp.com/form/';
  private requestOptions = { headers: { 'Content-Type': 'application/json' } }

  constructor(
    private http: HttpClient
  ) { 

  }
  public checkFormByMenu(menuId: number) {
    return this.http.get(this.url + "menu/" + menuId, this.requestOptions).toPromise();
  }
}
