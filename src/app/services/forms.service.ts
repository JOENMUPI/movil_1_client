import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Forms } from '../pages/menu/forms/forms.model';

@Injectable({
  providedIn: 'root'
})
export class FormsService {
  getForm(recipeId: string) {
    throw new Error('Method not implemented.');
  }
  forms: Forms[] = [];


  constructor(private http: HttpClient) { }

  //getForm(formId:string){
  //return this.http.get<any>(

  //);
  //}
}
