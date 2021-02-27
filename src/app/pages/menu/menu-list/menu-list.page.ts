import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { from } from 'rxjs';
import { MenusService } from 'src/app/services/menu.service';
import { Menu } from '../menu.model';
@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.page.html',
  styleUrls: ['./menu-list.page.scss'],
})
export class MenuListPage implements OnInit {
  menu: Menu;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private menusService: MenusService
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      //cosnt recipeId = paramMap.get("menuId");
      //this.menuService.getMenu(recipeId).subscribe((data) => {
      // this.menu = data;
      //console.log(data);
      //});
    });
  }

}
