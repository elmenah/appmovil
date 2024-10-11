import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.page.html',
  styleUrls: ['./sucursales.page.scss'],
})
export class SucursalesPage implements OnInit {

  constructor(private navCtrl: NavController, private storage: Storage,private alertController: AlertController,private menuController: MenuController) { }

  ngOnInit() {
    
  }

  async seleccionarSucursal(sucursal: string) {
    await this.storage.set('sucursalSeleccionada', sucursal);//Guarda la sucursal seleccionada
    const user = await this.storage.get('userName');//guardo el username en la const user
    await this.presentWelcomeAlert(user);//mensaje de bienvenida
    this.navCtrl.navigateForward('/home');
  }
  async presentWelcomeAlert(username: string) {
    const alert = await this.alertController.create({
      header: 'Bienvenido',
      message: `Bienvenido a la terraza, ${username}`,
      buttons: ['OK']
    });
    await alert.present();
  }
}
