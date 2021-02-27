import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormsService } from 'src/app/services/forms.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.page.html',
  styleUrls: ['./forms.page.scss'],
})
export class FormsPage implements OnInit {
  constructor(
    private formsService: FormsService,
    private activatedRoute: ActivatedRoute
  ) { }

  questions = [];

  ngOnInit() {
    //this.activatedRoute.paramMap.subscribe((paramMap) => {
    //const recipeId = paramMap.get("formId");
    //this.formsService.getForm(recipeId).subscribe((data) => {
    // this.questions = data;
    //this.formsService.forms = data;
    //console.log(this.questions);
    //});
    //});
  }
}
