import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BasicService } from '../../services/basic/basic.service';
import { TypeInputHttpService } from '../../services/http/type-input-http.service';
import { FormHttpService } from '../../services/http/form-http.service';
import { Response } from 'src/app/interfaces/response.model';
import { Form } from 'src/app/interfaces/form.model';
import { Section } from 'src/app/interfaces/section.model';
import { Input } from 'src/app/interfaces/input.model';
import { Question } from 'src/app/interfaces/question.model';


@Component({
  selector: 'app-new-form',
  templateUrl: './new-form.page.html',
  styleUrls: ['./new-form.page.scss'],
})
export class NewFormPage implements OnInit {
  // Variables
  private form: Form = { tittle: '', sections: null }
  private typeInput = [];

  constructor(
    private fHttpS: FormHttpService,
    private tIHttpS: TypeInputHttpService,
    private bs: BasicService,   
    private ruteActivated: ActivatedRoute,
    private router: Router 
  ) { 

  }


  // Life
  ngOnInit() {
    
  }

  ionViewWillEnter() { 
    this.getTypeInput();  
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
  public newSection() {
    this.bs.alertWithInputs(
      'New Section', 
      'Write a new section',
      [{ 
        name: 'tittle',
        type: 'text',
        placeholder: 'Tittle'
      }, { 
        name: 'description',
        type: 'text',
        placeholder: 'Description'
      }], [{
        text: "Cancel",
        role: 'cancel'
      }, { 
        text: 'Ready', 
        handler: (res) => {   
          if (this.bs.checkField([ res.tittle, res.description ])) {
            if (this.form.sections != null) {
              (!this.form.sections.find(i => i.tittle == res.tittle))
              ?this.form.sections.push({ tittle: res.tittle, message: res.description, questions: null })
              : this.bs.toast('Repeated section name', 2000, 'top');

            } else {
              this.form.sections = [{ tittle:res.tittle, message: res.description, questions: null }];
            }
          
          } else {   
            this.bs.toast('Empty field', 2000, 'top');
          }
        }
      }]
    );
  }

  public editSection(section: Section) {
    this.bs.alertWithInputs(
      'Edit section', 
      section.tittle,
      [{ 
        name: 'tittle',
        type: 'text',
        placeholder: section.tittle
      }, { 
        name: 'description',
        type: 'text',
        placeholder: section.message
      }], [{
        text: "Cancel",
        role: 'cancel'
      }, { 
        text: 'Ready', 
        handler: (res) => {   
          if (this.bs.checkField([ res.tittle, res.description ])) {
            if(this.form.sections.find(i => (i.tittle == res.tittle && i.tittle != section.tittle ))) {
              this.bs.toast('Repeated section name, edit failed', 2000, 'top');

            } else {
              section.tittle = res.tittle;
              section.message = res.description;
              this.bs.toast('Edit section successfully', 2000, 'top');
            }
          } else {
            this.bs.toast('Empty field, edit failed', 2000, 'top');
          }
        }
      }]
    );
  }

  public deleteSection(section: Section) {
    this.bs.alert(
      'Delete section', 
      `Do you want to remove the ${ section.tittle } section?`,
      [{
        text: "Cancel",
        role: 'cancel'
      }, { 
        text: 'Ready', 
        handler: () => {
          this.form.sections = this.form.sections.filter(i => i.tittle != section.tittle);
        }
      }]
    );
  }

  public newQuestion(section: Section) {
    this.bs.alertWithInputs(
      'New question', 
      'Write a new question',
      [{ 
        name: 'question',
        type: 'textarea',
        placeholder: 'Question'
      }], [{
        text: "Cancel",
        role: 'cancel'
      }, { 
        text: 'Ready', 
        handler: (res) => {
          let inputs: Input[] = [{ message: 'Response:', id: null, responses: null }]

          if(this.bs.checkField([ res.question ])) {
            if (section.questions != null) {
              (!section.questions.find(i => i.tittle == res.question))
              ? section.questions.push({ tittle: res.question, type: 'Text', obligatory: true, inputs })
              : this.bs.toast('Repeated question name', 2000, 'top');
            
            } else {
              section.questions = [{ tittle: res.question, type: 'Text', obligatory: true, inputs }];
            }
        
          } else {
            this.bs.toast('Empty field', 2000, 'top');
          }
        }
      }]
    );
  }

  public editQuestion(question: Question, section: Section) {
    this.bs.alertWithInputs(
      'Edit question', 
      question.tittle,
      [{ 
        name: 'tittle',
        type: 'text',
        placeholder: question.tittle
      }], [{
        text: "Cancel",
        role: 'cancel'
      }, { 
        text: 'Ready', 
        handler: (res) => {   
          if (this.bs.checkField([ res.tittle ])) {
            if(section.questions.find(i => (i.tittle == res.tittle && i.tittle != question.tittle))) {
              this.bs.toast('Repeated question name, edit failed', 2000, 'top');

            } else {
              question.tittle = res.tittle;
              this.bs.toast('Edit question successfully', 2000, 'top');
            }

          } else {
            this.bs.toast('Empty field, edit failed', 2000, 'top');
          }
        }
      }]
    );
  }

  public deleteQuestion(section: Section, question: Question) {
    this.bs.alert(
      'Delete question', 
      `Do you want to remove the ${ question.tittle } question?`,
      [{
        text: "Cancel",
        role: 'cancel'
      }, { 
        text: 'Ready', 
        handler: () => {
          section.questions = section.questions.filter(i => i.tittle != question.tittle);
        }
      }]
    );
  }

  public newInput(question: Question) {
    this.bs.alertWithInputs(
      'New input', 
      'Write a new input',
      [{ 
        name: 'tittle',
        type: 'text',
        placeholder: 'Tittle or placeholder'
      }], [{
        text: "Cancel",
        role: 'cancel'
      }, { 
        text: 'Ready', 
        handler: (res) => { 
          if(this.bs.checkField([ res.tittle ])) { 
            if(question.inputs != null) {
              (!question.inputs.find(i => i.message == res.tittle))
              ? question.inputs.push({ message: res.tittle, id: null, responses: null })
              : this.bs.toast('Repeated input name', 2000, 'top');
            
            } else {
              question.inputs = [{ message: res.tittle, id: null, responses: null }];
            }    
          
          } else {
            this.bs.toast('Empty field', 2000, 'top');
          } 
        }
      }]
    );
  }

  public editInput(input: Input, question: Question) {
    this.bs.alertWithInputs(
      'Edit input', 
      input.message,
      [{ 
        name: 'tittle',
        type: 'text',
        placeholder: input.message
      }], [{
        text: "Cancel",
        role: 'cancel'
      }, { 
        text: 'Ready', 
        handler: (res) => {   
          if (this.bs.checkField([ res.tittle ])) {
            if(question.inputs.find(i => (i.message == res.tittle && i.message != input.message))) {
              this.bs.toast('Repeated input name, edit failed', 2000, 'top');

            } else {
              input.message = res.tittle;
              this.bs.toast('Edit question successfully', 2000, 'top');
            }
            
          } else {
            this.bs.toast('Empty field, edit failed', 2000, 'top');
          }
        }
      }]
    );
  }

  public deleteInput(question: Question, input: Input) { 
    this.bs.alert(
      'Delete input', 
      `Do you want to remove the ${ input.message } input?`,
      [{
        text: "Cancel",
        role: 'cancel'
      }, { 
        text: 'Ready', 
        handler: () => {
          question.inputs = question.inputs.filter(i => i.message != input.message);
        }
      }]
    );
  }

  public editQuestionType(question: Question) { 
    this.bs.picker(
      'TypeInputs', 
      this.typeInput,
      [{
        text: "Cancel",
        role: 'cancel'
      }, { 
        text: 'Ready', 
        handler: (res) => {   
          if(res.TypeInputs.text == 'Text') { 
            question.inputs = [{ message: 'Response:', id: null, responses: null }];
          }

          question.type = res.TypeInputs.text; 
        }
      }] 
    );
  }

  public getTypeInput() {
    this.tIHttpS.getAllTypes().then((res: Response) => {
      switch(res.typeResponse) {
        case 'Success': 
          this.bs.toast(res.message, 2000, 'top');
          this.typeInput = res.body; 
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

  public sendForm() {
    if(this.checkForm()) { 
      this.bs.toast('Sending...', 2000, 'top');
      this.fHttpS.newForm(this.ruteActivated.snapshot.params.menuParentId, this.form).then((res: Response) => {
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
    }
  }

  public checkForm() { 
    let flag = true;

    if(this.bs.checkField([ this.form.tittle ])) {
      if(this.form.sections != null) {
        this.form.sections.forEach(section => {
          if(section.questions != null) {
            section.questions.forEach(question => {
              if(question.inputs == null) {
                flag = false;
                this.bs.alert('Error', 'Questions without inputs', [{ text: 'Ok' }]);
              }
            });
  
          } else {
            flag = false;
            this.bs.alert('Error','section without questions', [{ text: 'Ok' }]);
          }  
        });
  
      } else {
        flag = false;
        this.bs.alert('Error', 'Form without sections', [{ text: 'Ok' }]);
      }
    } else {
      flag = false;
      this.bs.alert('Error','Form without tittle', [{ text: 'Ok' }]);
    }
  
    return flag;
  }
}
