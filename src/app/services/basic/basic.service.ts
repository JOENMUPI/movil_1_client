import { Injectable } from '@angular/core';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';
import { User } from 'src/app/interfaces/user.model';


@Injectable({
  providedIn: 'root'
})
export class BasicService {

  constructor(
    private toastCtrl: ToastController, 
    private loadingCtrl: LoadingController, 
    private alertCtrl: AlertController
  ) {

  }

  public setUserOnSession(data: User) {
    sessionStorage.name = data.name
    sessionStorage.email = data.email;
    sessionStorage.id = data.id;
    sessionStorage.age = data.age;
    sessionStorage.gender = data.gender;
  }

  public checkField(fields: string[]) {
    let flag = true;
    
    fields.forEach(element => { 
      if(element.length <= 0) { 
        flag = false; 
      }
    });

    return flag
  }
  
  public async loading(cont: string, dur: number) { 
    const loading = await this.loadingCtrl.create({ 
      message: cont, 
      duration: dur 
    });

    await loading.present(); 
  }
  
  public async toast(msg: string, dur: number, pos) { 
    const toast = await this.toastCtrl.create({ 
      message: msg, 
      duration: dur, 
      position: pos
    });
    
    await toast.present();
  }
  
  public async alert(tit: string, msg: string, buttons: any[]) {
    const alert = await this.alertCtrl.create({ 
      header: tit,
      message: msg,
      buttons: buttons
    });

    await alert.present();
  }
}
