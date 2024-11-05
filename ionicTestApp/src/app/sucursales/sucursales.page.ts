import { Component, OnInit } from '@angular/core';

import { NavController } from '@ionic/angular';

import { Router } from '@angular/router';
import { StorageService } from 'src/managers/StorageService';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.page.html',
  styleUrls: ['./sucursales.page.scss'],
})
export class SucursalesPage implements OnInit {
  constructor(
    private navCtrl: NavController,
   
    private StorageService: StorageService,
    private menuController: MenuController,
    private router: Router
  ) {}

  ngOnInit() {}

  async seleccionarSucursal(sucursal: string) {
    await this.StorageService.set('sucursalSeleccionada', sucursal);
    

    // Navegar y reemplazar la URL para evitar que se quede en el historial
    await this.router.navigate(['/home']);

    // Usar setTimeout para dar tiempo a que se navegue antes de recargar
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }
}
