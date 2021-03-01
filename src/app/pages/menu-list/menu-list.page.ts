import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Response } from 'src/app/interfaces/response.model';
import { Menu } from '../../interfaces/menu.model';
import { MenuHttpService } from 'src/app/services/http/menu-http.service';
import { RoleHttpService } from 'src/app/services/http/role-http.service';
import { FormHttpService } from 'src/app/services/http/form-http.service';
import { BasicService } from '../../services/basic/basic.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.page.html',
  styleUrls: ['./menu-list.page.scss'],
})
export class MenuListPage implements OnInit {
  // Variables  
  private parent: Menu = { id: 0, parent: null, tittle: '' }
  private menus: Menu[] = [];
  private flag = false; 
  private menuFlag = false;

  constructor(
    private fHttpS: FormHttpService,
    private rHttpS: RoleHttpService,
    private mHttpS: MenuHttpService,
    private ruteActivated: ActivatedRoute,
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
  public back() { 
    (this.parent.id > 0 && this.parent.parent != null) 
    ? this.router.navigate([ '/menu/' + this.parent.parent ])
    : this.router.navigate([ '/menu' ]);
  }

  public go(id) { 
    this.router.navigate([ '/menu/' + id ]);
  }

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

  public checkForm() {
    this.fHttpS.checkFormByMenu(this.parent.id).then((res: Response) => {
      switch(res.typeResponse) {
        case 'Success': console.log('responss:', res);
          this.bs.toast(res.message, 2000, 'top');  
          if(res.body != null) {  
            this.router.navigate([ '/form/' + res.body.id ]); 
          }
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
          this.menuFlag = (this.menus.length <= 0);      
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

  public sendAddMenu(tittle) {
    this.bs.toast('Sending...', 2000, 'top');
    this.mHttpS.newMenu({ tittle, parent: this.parent.id, userId: sessionStorage.id }).then((res: Response) => {
      switch(res.typeResponse) {
        case 'Success': 
          this.bs.toast(res.message, 2000, 'top'); 
          this.menus.push({ tittle, parent: null, id: res.body.id });  
          this.menuFlag = (this.menus.length <= 0);
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

  public getMenus() {
    this.bs.toast('Loading...', 2000, 'top');
    this.mHttpS.getMenusById(this.ruteActivated.snapshot.params.id).then((res: Response) => {
      switch(res.typeResponse) {
        case 'Success': 
          this.bs.toast(res.message, 2000, 'top');
          this.parent = res.body[0]; 
          for(let i = 1; i < res.body.length; i++) { 
            this.menus.push(res.body[i]);
          } 

          this.menuFlag = (this.menus.length <= 0); 
          if(this.menus.length <= 0) {
            this.checkForm();
          }
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
