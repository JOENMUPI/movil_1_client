import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { MenusService } from 'src/app/services/menu.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  menu = [];
  constructor(
    private router: Router,
    private menuService: MenusService
  ) { }

  openFirst() {
    this.menu.enable(true, "first");
    this.menu.open("first");
  }

  ngOnInit() {
    //this.menuService.getMenus().subscribe((data) => {
    // this.menu = data;
    //this.menuService.menus = data;
    //});
  }
  ionViewWildEnter() {
    //this.menuService.getMenu().subscribe((data) => {
    //this.menu = data;
    //});
  }

  // goToProfile() {
  //this.router.navigate(["./"]);
  //}
  addNewMenu() {
    console.log('process');
  }

}
