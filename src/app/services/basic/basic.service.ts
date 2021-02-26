import { Injectable } from '@angular/core';
import { ToastController, AlertController, LoadingController, ActionSheetController } from '@ionic/angular';
import { User } from 'src/app/interfaces/user.model';


@Injectable({
  providedIn: 'root'
})
export class BasicService {

  constructor(
    private actionSheetCtrl: ActionSheetController,
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

  public checkField(fields: any[]) {
    let flag = true;
    
    fields.forEach(element => { 
      if(element.length <= 0) { 
        flag = false; 
      }
    });

    return flag
  }

  public async actionSheet(header, buttons: any[]) {
    const actionSheet = await this.actionSheetCtrl.create({
      header,
      buttons
    });
    
    await actionSheet.present();
  }
  
  public async loading(message: string, duration: number) { 
    const loading = await this.loadingCtrl.create({ 
      message, 
      duration 
    });

    await loading.present(); 
  }
  
  public async toast(message: string, duration: number, position) { 
    const toast = await this.toastCtrl.create({ 
      message, 
      duration, 
      position
    });
    
    await toast.present();
  }
  
  public async alert(header: string, message: string, buttons: any[]) {
    const alert = await this.alertCtrl.create({ 
      header,
      message,
      buttons
    });

    await alert.present();
  }
}
