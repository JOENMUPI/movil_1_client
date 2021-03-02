import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DataFormPageRoutingModule } from './data-form-routing.module';

import { DataFormPage } from './data-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DataFormPageRoutingModule
  ],
  declarations: [DataFormPage]
})
export class DataFormPageModule {}
