import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SessionManager } from 'src/managers/SessionManager';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  usuario: string | null = null;
  userEmail: string = '';
  newPassword: string = '';

  constructor(
    
    private afAuth: AngularFireAuth,
    private toastController: ToastController,
    private menuController: MenuController,
    private router: Router,
    private sessionManager: SessionManager,
    
  ) {}

  ngOnInit() {
    this.loadUserData();
  }

  perfil() {
    this.router.navigate(['/perfil'])
  }

  carrito(){
    this.router.navigate(['/carrito']);
  }


  async loadUserData() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.usuario = user.displayName || 'Usuario'; // Si no hay displayName, muestra un valor por defecto
        this.userEmail = user.email || ''; // Obtiene el email del usuario
        
      } else {
        console.log('No hay usuario autenticado');
      }
    });
  }

  async updateEmail() { //Funcion para actualizar el correo del usuario actual
    const user = await this.afAuth.currentUser;
    if (user && this.userEmail) {
      try {
        await user.updateEmail(this.userEmail);
        this.showToast('Correo electrónico actualizado exitosamente.', 'success');
      } catch (error) {
        this.handleError(error);
      }
    }
  }

  async updatePassword() {
    const user = await this.afAuth.currentUser;
    if (user && this.newPassword) {
      try {
        await user.updatePassword(this.newPassword);
        this.showToast('Contraseña actualizada exitosamente.', 'success');
      } catch (error) {
        this.handleError(error);
      }
    }
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
    });
    toast.present();
  }

  handleError(error: unknown) {
    let errorMessage = 'Ocurrió un error.';
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }

    this.showToast(`Error: ${errorMessage}`, 'danger');
  }


  logout() {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
      this.sessionManager.performLogout(); // Limpiar la sesión
      this.menuController.close();
      this.router.navigate(['/login']); // Redirigir a la página de inicio de sesión
    }
  }

  async deleteUser() {
    const deleted = await this.sessionManager.eliminarCuenta();
    if (deleted == true) {
      this.router.navigate(['/register']);
      this.menuController.close();
      this.sessionManager.setSession(false);
    } else {
      console.log('No se elimino la cuenta');
    }
  }
}
