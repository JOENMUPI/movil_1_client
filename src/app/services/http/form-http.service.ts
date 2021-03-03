import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Form } from 'src/app/interfaces/form.model';

@Injectable({
  providedIn: 'root'
})
export class FormHttpService {
  private urlx = 'http://localhost:8000/form/';
  private url = 'https://server-movil-1.herokuapp.com/form/';
  private requestOptions = { headers: { 'Content-Type': 'application/json' } }

  constructor(
    private http: HttpClient
  ) { 

  }

  public checkFormByMenu(menuId: number) {
    return this.http.get(this.url + "menu/" + menuId, this.requestOptions).toPromise();
  }

  public getFormById(formId) {
    return this.http.get(this.url + formId, this.requestOptions).toPromise();
  }

  public newForm(menuId: number, form: Form) {
    return this.http.post(this.url, { userId: sessionStorage.id, menuId,  form}, this.requestOptions).toPromise();
  }

  public deleteForm(id) {
    return this.http.delete(this.url + sessionStorage.id + '/' + id, this.requestOptions).toPromise();
  }
}
