import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Response } from 'src/app/interfaces/response.model';
import { User } from 'src/app/interfaces/user.model';
import { Pass } from '../../interfaces/pass.model'
import { BasicService } from '../../services/basic/basic.service';
import { GenderHttpService } from '../../services/http/gender-http.service';
import { UserHttpService } from '../../services/http/user-http.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  // variable 
  private genders = [];
  private resGender = { id: 0, description: '' }
  private user: User;
  
  constructor(
    private bs: BasicService,
    private router: Router,
    private gHttpS: GenderHttpService,
    private uHttpS: UserHttpService
  ) {

  } 



  // Life
  ngOnInit() {
    this.user = this.bs.getUserOnSession(); 
  }

  ionViewWillEnter() {
    this.bs.toast('Loading...', 2000, 'top');
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
  public editName() {
    this.bs.alertWithInputs(
      'Edit name', 
      'Write your new name', 
      [{ 
        name: 'name',
        type: 'text',
        placeholder: this.user.name
      }], [{
        text: "Cancel",
        role: 'cancel'
      }, { 
        text: 'Ready', 
        handler: (res) => { 
          (this.bs.checkField([ res.name ])) 
          ? this.user.name = res.name
          : this.bs.toast('Empty field', 2000, 'top');
        }
      }]
    );
  }

  public editEmail() {
    this.bs.alertWithInputs(
      'Edit email', 
      'Write your new email', 
      [{ 
        name: 'email',
        type: 'text',
        placeholder: this.user.email
      }], [{
        text: "Cancel",
        role: 'cancel'
      },{ 
        text: 'Ready', 
        handler: (res) => { 
          (this.bs.checkField([ res.email ])) 
          ? this.user.email = res.email
          : this.bs.toast('Empty field', 2000, 'top');
        }
      }]
    );
  }

  public buttonsAge() {
    return [{
      text: "Cancel",
      role: 'cancel'
    }, {
      text:'Ready',
      handler: (res: any) => { 
        this.user.age = res.Age.value; 
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
        this.user.gender = res.Gender.text;
        this.resGender.description = res.Gender.text;
        this.resGender.id = res.Gender.value;  
      }
    }]
  }

  public editPass() {
    this.bs.alertWithInputs(
      'Edit pass', 
      'Write your new pass', 
      [{
        name: 'oldPass',
        type: 'password',
        placeholder: 'Old Password',
      }, {
        name: 'newPass',
        type: 'password',
        placeholder: 'New Password',
      }, {
        name: 'confirmPass',
        type: 'password',
        placeholder: 'Confirm Password',
      }], [{
        text: "Cancel",
        role: 'cancel'
      },{ 
        text: 'Update', 
        handler: (res) => {  
          (this.bs.checkField([ res.oldPass, res.confirmPass, res.newPass ])) 
          ? this.sendDataPass({ oldPassword: res.oldPass, confirmPassword: res.confirmPass, password: res.newPass })
          : this.bs.toast('Please write all field', 2000, 'top');
        }
      }]
    );
  }

  public sendDataPass(data: Pass) { 
    this.uHttpS.updatePass(data).then((res: Response) => {
      this.bs.toast('Loading...', 2000, 'top');
      switch(res.typeResponse) {
        case 'Success': 
          this.bs.toast(res.message, 2000, 'top');    
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

  public sendDataUser() { 
    if(this.user.name != sessionStorage.name
      || this.user.gender != sessionStorage.gender
      || this.user.email != sessionStorage.email
      || this.user.age != sessionStorage.age
    ) {
      this.user.gender = this.resGender.id;
      this.uHttpS.updateUser(this.user).then((res: Response) => {
      this.user.gender = this.resGender.description;
      this.bs.toast('Loading...', 2000, 'top');
      switch(res.typeResponse) {
        case 'Success':
          this.bs.toast(res.message, 2000, 'top');
          this.bs.setUserOnSession(this.user); 
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

    } else {
      this.bs.toast('all fields unchanged', 2000,'top');
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
