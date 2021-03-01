import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Response } from 'src/app/interfaces/response.model';
import { Menu } from '../../interfaces/menu.model';
import { MenuHttpService } from 'src/app/services/http/menu-http.service';
import { RoleHttpService } from 'src/app/services/http/role-http.service';
import { BasicService } from '../../services/basic/basic.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  // Variables
  private menus: Menu[] = [];
  private flag = false;
  
  constructor(
    private rHttpS: RoleHttpService,
    private mHttpS: MenuHttpService,
    private bs: BasicService,
    private router: Router
  ) {

  }

  // Life
  ngOnInit() {
    
  }

  ionViewWillEnter() {
    this.checkUser();
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
  public newMenu() {
    this.bs.alertWithInputs(
      'New menu',
      'Write new menu', 
      [{ 
        name: 'menu',
        type: 'text',
      }], [{
        text: "Cancel",
        role: 'cancel'
      }, { 
        text: 'Ready', 
        handler: (res) => {   
          (this.bs.checkField([ res.menu ])) 
          ? this.sendAddMenu(res.menu)   
          : this.bs.toast('Empty field', 2000, 'top');
        }
      }]
    ); 
  }

  public deleteMenu(menu: Menu) {
    this.bs.alert(
      'Warning', 
      `sure you want to delete ${ menu.tittle }?`,
      [{
        text: "Cancel",
        role: 'cancel'
      }, { 
        text: 'Sure', 
        handler: () => {   
          this.sendDeleteMenu(menu.id);
        }
      }]
    );
  }

  public checkUser() {
    this.rHttpS.authUser().then((res: Response) => {
      switch(res.typeResponse) {
        case 'Success': 
          this.flag = res.body;
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
    }, (err) => { console.log('Error:', err); 
      this.bs.alert('Fatal error', err, [{ text: 'Ok' }]); 
    });
  }

  public sendDeleteMenu(id) {
    this.bs.toast('Sending...', 2000, 'top');
    this.mHttpS.deleteMenu(id).then((res: Response) => {
      switch(res.typeResponse) {
        case 'Success': 
          this.bs.toast(res.message, 2000, 'top'); 
          this.menus = this.menus.filter(i => i.id != id);        
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
    }, (err) => { console.log('Error:', err); 
      this.bs.alert('Fatal error', err, [{ text: 'Ok' }]); 
    });
  }

  public sendAddMenu(tittle: string) {
    this.bs.toast('Sending...', 2000, 'top');
    this.mHttpS.newMenu({ tittle, parent: null, userId: sessionStorage.id }).then((res: Response)=> {
      switch(res.typeResponse) {
        case 'Success': 
          this.bs.toast(res.message,2000, 'top'); 
          this.menus.push({ tittle, parent: null, id: res.body.id });  
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
    }, (err) => { console.log('Error:', err); 
      this.bs.alert('Fatal error', err, [{ text: 'Ok' }]); 
    });
  }

  public getMenus() {
    this.bs.toast('Loading...', 2000, 'top');
    this.mHttpS.getMenus().then((res: Response) => {
      switch(res.typeResponse) {
        case 'Success': 
          this.bs.toast(res.message, 2000, 'top');
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
}
