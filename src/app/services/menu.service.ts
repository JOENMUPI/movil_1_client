import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Menu } from "../pages/menu/menu.model";
@Injectable({
  providedIn: 'root'
})
export class MenusService {
  getMenus() {
    throw new Error('Method not implemented.');
  }
  menus: Menu[] = [];

  constructor(private http: HttpClient) { }

  //getMenus() {
  //return this.http.get<any>(
  //"https://api-rest-s.herokuapp.com/api/forms/menu"
  //);
  //}

  //getMenu(menuId: string) {
  //return this.http.get<any>(
  //"https://api-rest-s.herokuapp.com/api/forms/submenu/" + menuId
  //);
  //}
}