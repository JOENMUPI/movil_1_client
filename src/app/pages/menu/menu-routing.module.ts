import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage
  },
  {
    path: 'menu-list',
    loadChildren: () => import('./menu-list/menu-list.module').then( m => m.MenuListPageModule)
  },
  {
    path: 'forms',
    loadChildren: () => import('./forms/forms.module').then( m => m.FormsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
