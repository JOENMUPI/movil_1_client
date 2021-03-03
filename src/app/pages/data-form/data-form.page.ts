import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResponseHttpService } from '../../services/http/response-http.service';
import { BasicService } from '../../services/basic/basic.service';
import { Response } from 'src/app/interfaces/response.model';
import { Form } from 'src/app/interfaces/form.model';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.page.html',
  styleUrls: ['./data-form.page.scss'],
})
export class DataFormPage implements OnInit {
  // Variables
  private allUsers = null;
  private form: Form = { tittle: 'Loading...', sections: null }
    

  constructor(
    private resHttpS: ResponseHttpService,
    private bs: BasicService, 
    private ruteActivated: ActivatedRoute,
  ) { 

  }

  // Life
  ngOnInit() {
  
  }

  ionViewWillEnter() {
    this.getResponse();
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
  private processData() {
    this.form.sections.forEach(section => {
      section.questions.forEach(question => {
        if(question.type == 'MultipleChoice' || question.type == 'List') {
          question.inputs.forEach(input => {
              let yes = 0;

              input.responses.forEach(res => { 
              if(res.response) { 
                yes += 1; 
              }
            });

            input.responses = (yes / this.allUsers) * 100;
          });
        } 
      });
    });
  }

  public getResponse() { 
    this.allUsers = null
    this.bs.toast('Loading...', 2000, 'top');
    this.resHttpS.getResponses(this.ruteActivated.snapshot.params.formId).then((res: Response) => {
      switch(res.typeResponse) {
        case 'Success': 
          this.bs.toast(res.message, 2000, 'top'); 
          this.allUsers = res.body.userNum;
          this.form = res.body.form; 
          this.processData();
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
