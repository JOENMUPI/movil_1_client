import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Response } from 'src/app/interfaces/response.model';
import { BasicService } from '../../services/basic/basic.service';
import { GenderHttpService } from '../../services/http/gender-http.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  // Variables
  public genders = [];
  
  constructor(
    private bs: BasicService,
    private router: Router,
    private gHttpS: GenderHttpService
  ) { 

  }

  // Life
  ngOnInit() {
    
  }

  ionViewWillEnter() {
    this.getGenders();
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
  public getGenders() {
    this.gHttpS.getAllGenders().then((res: Response) => {
      switch(res.typeResponse) {
        case 'Success': 
            this.genders = res.body
            console.log(res.body);
             
            break;

        case 'Fail':
            this.bs.toast(res.message, 5000, 'top');
            res.body.forEach(element  => {
              this.bs.toast(element.message, 3000, 'top');
            });
            break;

        default:
            this.bs.alert(res.typeResponse, res.message, [{ text: 'Ok' }]);
            break;
      }
    });    
  }

}
