import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  searchQuery: string = '';
  categories: string[] = ['Cervezas', 'Vinos', 'Ron', 'Whisky', 'Tequila'];
  isAuthenticated: boolean = false; // Variable para verificar autenticación

  featuredProducts = [
    { name: 'Whiskys', img: 'assets/imgs/whiskys.png' },
    { name: 'Vinos', img: 'assets/imgs/vinos.png' },
    { name: 'Cervezas', img: 'assets/imgs/cervezas.png' }
  ];

  constructor(private popoverController: PopoverController) {}

  ngOnInit() {
    const user = localStorage.getItem('user');
    this.isAuthenticated = !!user; // Verificar si el usuario ha iniciado sesión
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: 'popover-component',
      event: ev,
      translucent: true
    });
    await popover.present();
  }

  viewAccount() {
    console.log('Ver Cuenta');

  }

  logout() {
    console.log('Cerrar Sesión');
    localStorage.removeItem('user');
    this.isAuthenticated = false;
  }
}
