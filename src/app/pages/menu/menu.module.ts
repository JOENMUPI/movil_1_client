import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MenuPageRoutingModule } from './menu-routing.module';

import { MenuPage } from './menu.page';
import { from } from 'rxjs';
const routes: Routes = [
  {
    path: 'menu',
    component: MenuPage,
    children: [
      { path: 'details/:level', loadChildren: () => import('../menu/menu-routing.module').then(m => m.MenuPageRoutingModule) }
    ]
  },
  {
    path: '',
    redirectTo: '/menu/details/0',
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MenuPageRoutingModule
  ],
  declarations: [MenuPage]
})
export class MenuPageModule { }
