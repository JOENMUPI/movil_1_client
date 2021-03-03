import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResponseHttpService {
  private url = 'http://localhost:8000/response/';
  private urlx = 'https://server-movil-1.herokuapp.com/response/';
  private requestOptions = { headers: { 'Content-Type': 'application/json' } }

  constructor(
    private http: HttpClient
  ) { 

  }

  public getResponses(formId: number) {
    return this.http.get(this.url + sessionStorage.id + '/' + formId, this.requestOptions).toPromise();
  }

  public newResponses(formId: number, responses: any[]) {
    return this.http.post(this.url, { responses, formId, userId: sessionStorage.id }, this.requestOptions).toPromise();
  }
}
