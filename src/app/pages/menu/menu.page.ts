import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuListPage } from './../menu-list/menu-list.page';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  rootPage = MenuListPage;
  level = null;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.level = this.route.snapshot.paramMap.get('level');
  }

}
