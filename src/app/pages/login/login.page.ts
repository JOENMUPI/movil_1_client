import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { UserHttpService } from '../../services/http/user-http.service'; 
import { BasicService } from '../../services/basic/basic.service';
import { LoginUser } from 'src/app/interfaces/login-user.model';
import { Response } from 'src/app/interfaces/response.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit { 
  constructor(  
    private bs: BasicService,
    private router: Router,
    private uHttpS: UserHttpService) { 
  }


  // Life
  ngOnInit() {
    
  }

  ionViewWillEnter() {
    
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
  public singin(email: string, password: string) { 
    if(!this.bs.checkField([ email, password ])) { 
      this.bs.alert('Fields', 'Please write email or passwor', [{ text: 'Ok' }]);

    } else { 
      let data: LoginUser = { email, password };

      this.bs.loading('Loading', 5000);
      this.uHttpS.login(data).then((res: Response) => { 
        switch(res.typeResponse) {
          case 'Success': 
            this.bs.toast(res.message, 2000, 'top');
            this.bs.setUserOnSession(res.body);
            this.router.navigate(['/home']);  
            break;

          case 'Fail':
            this.bs.toast(res.message, 5000, 'top');
            res.body.errors.forEach(element  => {
              this.bs.toast(element.message, 3000, 'top');
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
  }
}