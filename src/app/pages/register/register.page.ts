import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Response } from 'src/app/interfaces/response.model';
import { User } from 'src/app/interfaces/user.model';
import { BasicService } from '../../services/basic/basic.service';
import { GenderHttpService } from '../../services/http/gender-http.service';
import { UserHttpService } from '../../services/http/user-http.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  // Variables
  private genders = [ ];
  private resGender = { id: 0, description: '' }
  private resAge = null;

  constructor(
    private bs: BasicService,
    private router: Router,
    private gHttpS: GenderHttpService,
    private uHttpS: UserHttpService
  ) { 

  }

  // Life
  ngOnInit() {

  }

  ionViewWillEnter() {
    this.bs.loading('Loading...', 2000);
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
  public buttonsAge() {
    return [{
      text: "Cancel",
      role: 'cancel'
    }, {
      text:'Ok',
      handler: (res: any) => { 
        this.resAge = res.Age.value; 
      }
    }]
  }

  public buttonsGender() {
    return [{
      text: "Cancel",
      role: 'cancel'
    }, {
      text:'Ok',
      handler: (res: any) => {  
        this.resGender.description = res.Gender.text;
        this.resGender.id = res.Gender.value; 
      }
    }]
  }

  public register(name: string, email: string, password: string, confirmPassword: string) {
    if(!this.bs.checkField([ email, password, confirmPassword, name ]) || this.resGender.id <= 0) { 
      this.bs.alert('Fields', 'Please write on all fields', [{ text: 'Ok' }]);

    } else {
      let data: User = { name, email, password, confirmPassword, age: this.resAge, gender: this.resGender.id, id: null };
      
      this.bs.loading('Loading...', 3000);
      this.uHttpS.register(data).then((res: Response) => {
        switch(res.typeResponse) {
          case 'Success': 
            this.bs.toast(res.message, 2000, 'top');  
            data.id = res.body.id;  
            data.gender = this.resGender.description;
            this.bs.setUserOnSession(data);  
            this.router.navigate(['/home']);  
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
  }

  public getGenders() {
    this.gHttpS.getAllGenders().then((res: Response) => {
      switch(res.typeResponse) {
        case 'Success': 
          this.genders = res.body;
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
    }, (err) => { console.log('Error:', err); 
      this.bs.alert('Fatal error', err, [{ text: 'Ok' }]); 
    });     
  }
}
