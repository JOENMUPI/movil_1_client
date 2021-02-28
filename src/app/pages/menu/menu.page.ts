import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Response } from 'src/app/interfaces/response.model';
import { Menu } from '../../interfaces/menu.model';
import { MenuHttpService } from 'src/app/services/http/menu-http.service';
import { BasicService } from '../../services/basic/basic.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  // Variables
  private menus: Menu[] = [];
  
  constructor(
    private mHttpS: MenuHttpService,
    private bs :BasicService,
    private router: Router
  ) {

  }

  // Life
  ngOnInit() {
    
  }

  ionViewWillEnter() {
    this.getMenus();
  }

  ionViewDidEnter() {
    
  }

  ionViewWillLeave() {
    
  }

  ionViewDidLeave() {
    
  }

  ngOnDestroy() {
    
  }

  // Logic
  public getMenus() {
    this.mHttpS.getMenus().then((res: Response) => {
      switch(res.typeResponse) {
        case 'Success': 
          this.bs.toast('Loading...', 3000, 'top');
          this.menus = res.body;  
          break;

        case 'Fail':
          this.bs.toast(res.message, 5000, 'top');
          res.body.errors.forEach(element  => {
            this.bs.toast(element.text, 3000, 'top');
          });
          break;
        
        default:
          this.bs.alert(res.typeResponse, res.message, [{ text: 'Ok' }]);
          break;
      }  
    }), (err) => { console.log('Error:', err); 
      this.bs.alert('Fatal error', err, [{ text: 'Ok' }]); 
    };
  }

  public addMenu(tittle: string) {
    
  }
}
