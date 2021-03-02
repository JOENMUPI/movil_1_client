import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DataFormPage } from './data-form.page';

const routes: Routes = [
  {
    path: ':formId',
    component: DataFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataFormPageRoutingModule {}
