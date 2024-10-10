import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SessionManager } from 'src/managers/SessionManager';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  usuario: string | null = null;
  
  constructor( private menuController: MenuController,private router: Router,
    private sessionManager: SessionManager) {}


  async ngOnInit() {
    this.usuario = await this.sessionManager.obtenerUser(); 
    }
  async openSecondaryMenu() {
    this.menuController.open('secondary-menu');
    
  }

  logout() {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
      this.sessionManager.performLogout(); // Limpiar la sesión
      this.menuController.close();
      this.router.navigate(['/login']); // Redirigir a la página de inicio de sesión

    }
  }
}
