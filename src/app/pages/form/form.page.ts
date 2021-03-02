import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormHttpService } from '../../services/http/form-http.service';
import { ResponseHttpService } from '../../services/http/response-http.service';
import { RoleHttpService } from 'src/app/services/http/role-http.service';
import { BasicService } from '../../services/basic/basic.service';
import { Form } from 'src/app/interfaces/form.model';
import { Response } from 'src/app/interfaces/response.model';
import { Input } from 'src/app/interfaces/input.model';
import { Question } from 'src/app/interfaces/question.model';


@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {
  private form: Form = { tittle: '', sections: null }
  private responses = [];
  private flag = false;

  constructor(
    private rHttpS: RoleHttpService,
    private resHttpS: ResponseHttpService,
    private fHttpS: FormHttpService,
    private bs: BasicService, 
    private ruteActivated: ActivatedRoute,
    private router: Router 
  ) { 

  }

  // Life
  ngOnInit() {
  
  }

  ionViewWillEnter() {
    this.checkUser();
    this.getForm();
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
  public addResponse(input: Input, question: Question) {
    switch(question.type) {
      case 'Text':
        this.bs.alertWithInputs(
          'Response', 
          input.message, 
          [{ 
            name: 'data',
            type: 'textarea',
            placeholder: 'response'
          }], [{
            text: "Cancel",
            role: 'cancel'
          }, { 
            text: 'Ready', 
            handler: (res) => {   
              if (this.bs.checkField([ res.data ])) { 
                if(this.responses.length > 0) {
                  if(this.responses.find(i => i.inputId == input.id)) {
                    this.responses = this.responses.filter(i => i.inputId != input.id);
                  } 
                } 
    
              } else {   
                this.bs.toast('Empty field', 2000, 'top');
              } 
    
              input.response = res.data; 
              this.responses.push({ inputId: input.id, data: { response: res.data } }); 
            }
          }]
        );
        break;

      case 'List':
        let aux = [];

        question.inputs.forEach(inp => {
          aux.push({ description: inp.message, id: inp.id });
        });
        
        this.bs.picker(
          'Data',
          aux,
          [{
            text: "Cancel",
            role: 'cancel'
          }, {
            text: 'Select', 
            handler: (res) => { 
              question.inputs.forEach(e => {
                if(this.responses.length > 0) {
                  if(this.responses.find(i => i.inputId == e.id)) {
                    this.responses = this.responses.filter(i => i.inputId != e.id);
                  }
                }

                (e.id == input.id) 
                ? this.responses.push({ inputId: e.id, data: { response: true } })
                : this.responses.push({ inputId: e.id, data: { response: false } }); 
              }); 
            }
          }]);
        break;

      case 'MultipleChoice':
        input.response = !input.response;
        if(this.responses.length > 0) {
          if(this.responses.find(i => i.inputId == input.id)) {
            this.responses = this.responses.filter(i => i.inputId != input.id);
          } 
        }

        this.responses.push({ inputId: input.id, data: { response: input.response } }); 
        break;
    }
  }

  public deleteForm() {
    this.bs.alert(
      'Delete Form', 
      'Do you want to delete this form?', 
      [{
        text: "Cancel",
        role: 'cancel'
      }, { 
        text: 'Sure', 
        handler: () => {   
          this.sendDeleteForm();
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

  public sendDeleteForm() {
    this.bs.toast('Sending...', 2000, 'top');
    this.fHttpS.deleteForm(this.ruteActivated.snapshot.params.formId).then((res: Response) => {
      switch(res.typeResponse) {
        case 'Success': 
          this.bs.toast(res.message, 2000, 'top'); console.log('toy aqui');
          this.router.navigate([ '/menu' ]);
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

  public sendResponses() {
    if(this.checkresponses()) {
      this.bs.toast('Sending...', 2000, 'top');
      this.resHttpS.newResponses(this.ruteActivated.snapshot.params.formId, this.responses).then((res: Response) => {
        switch(res.typeResponse) {
          case 'Success': 
            this.bs.toast(res.message, 2000, 'top'); 
            this.router.navigate([ '/menu' ]);
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

    } else {
      this.bs.toast('Missing inputs to fill!', 2000, 'top');
    }
  }

  public checkresponses() {
    let flag = true;

    this.form.sections.forEach(section => {
      section.questions.forEach(question => {
        question.inputs.forEach(input => {
          if(!this.responses.find(i => i.inputId == input.id)) {
            flag = false;     
          } 
        });
      });
    });

    return flag;
  }

  public getForm() { 
    this.responses = [];
    this.bs.toast('Loading...', 2000, 'top');
    this.fHttpS.getFormById(this.ruteActivated.snapshot.params.formId).then((res: Response) => {
      switch(res.typeResponse) {
        case 'Success': 
          this.bs.toast(res.message, 2000, 'top'); 
          this.form = res.body;
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
