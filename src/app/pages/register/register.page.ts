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
  public genderElements() {
    let arr = [];
    
    this.genders.forEach(gender => {
      arr.push({ 
        text: gender.description,
        handler: () => { this.resGender = gender; } 
      });
    });

    return arr;
  }

  public register(name: string, age: number, email: string, password: string, confirmPassword: string) {
    if(!this.bs.checkField([ email, password, confirmPassword, name, age ]) || this.resGender.id <= 0) { 
      this.bs.alert('Fields', 'Please write on all fields', [{ text: 'Ok' }]);

    } else {
      let data: User = { name, age, email, password, confirmPassword, gender: this.resGender.id, id: null };
      
      this.bs.loading('Loading', 5000);
      this.uHttpS.register(data).then((res: Response) =>{
        switch(res.typeResponse) {
          case 'Success': 
            data.id = res.body.id;  
            this.bs.toast(res.message, 2000, 'top');
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
