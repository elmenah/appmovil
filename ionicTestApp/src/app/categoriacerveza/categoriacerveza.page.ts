import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SessionManager } from 'src/managers/SessionManager'; 
@Component({
  selector: 'app-categoriacerveza',
  templateUrl: './categoriacerveza.page.html',
  styleUrls: ['./categoriacerveza.page.scss'],
})
export class CategoriacervezaPage implements OnInit {

  constructor(private router: Router,private menuController: MenuController,private sessionManager: SessionManager) { }

  ngOnInit() {
   
  }

  cervezas = [                        
    { name: 'Pack Escudo 6 UN.', description: 'Descripción de Cerveza 1', price: 10, imageUrl: 'assets/img/packescudo.jpg', category: 'Lager' },
    { name: 'Pack Corona', description: 'Descripción de Cerveza 2', price: 12, imageUrl: 'assets/img/cerveza2.jpg', category: 'Ale' },
    { name: 'Pack Royal Guard', description: 'Descripción de Cerveza 2', price: 12, imageUrl: 'assets/img/cerveza2.jpg', category: 'Ale' },
    
  ];
  ionViewWillEnter() {
    this.menuController.enable(true, 'main-menu'); // Habilita el menú principal
    this.menuController.enable(true, 'secondary-menu'); // Habilita el menú secundario
  }
  openSecondaryMenu() {
    this.menuController.open('secondary-menu');
  }
  logout() {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
      this.sessionManager.performLogout();  // Clear session
           // Redirect to login page
    }
  }
  verProducto(cerveza: any) {
    this.router.navigate(['/cerveza'], { state: { product: cerveza } });
  }

  palhome(){
    this.router.navigate(['/home']);
    this.menuController.close();
  }
}
