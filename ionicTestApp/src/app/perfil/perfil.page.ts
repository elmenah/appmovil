import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SessionManager } from 'src/managers/SessionManager';
import { Storage } from '@ionic/storage-angular';
import {
  getAuth,
  EmailAuthProvider,
  GoogleAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
  updatePassword,
} from 'firebase/auth';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  newPassword: string = '';
  usuario: string | null = null;
  userEmail: string = '';

  isEmailVerified: boolean = false;
  constructor(
    private afAuth: AngularFireAuth,
    private toastController: ToastController,
    private menuController: MenuController,
    private router: Router,
    private sessionManager: SessionManager,
    private storage: Storage,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loadUserData();
  }

  perfil() {
    this.router.navigate(['/perfil']);
  }

  carrito() {
    this.router.navigate(['/carrito']);
  }

  async loadUserData() {
    this.afAuth.authState.subscribe(async (user) => {
      if (user) {
        this.userEmail = user.email || ''; // Obtiene el email del usuario
        this.usuario = await this.storage.get('usuario');
      } else {
        console.log('No hay usuario autenticado');
      }
    });
  }

  async updatePassword() {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
        const currentPassword = prompt('Ingresa tu contraseña actual para confirmar la actualización:');
        if (currentPassword) {
            const credential = EmailAuthProvider.credential(user.email!, currentPassword);
            try {
                // Reautenticar al usuario
                await reauthenticateWithCredential(user, credential);
                
                const newPassword = prompt('Ingresa tu nueva contraseña:');
                if (newPassword) {
                    // Actualiza la contraseña del usuario
                    await updatePassword(user, newPassword);
                    this.showToast('Contraseña actualizada exitosamente.', 'success');
                } else {
                    this.showToast('Error: Debes ingresar una nueva contraseña.', 'error');
                }
            } catch (error) {
                console.error('Error al intentar reautenticar o actualizar la contraseña:', error);
                this.handleError(error);
            }
        } else {
            this.showToast('Error: Debes ingresar tu contraseña actual.', 'error');
        }
    } else {
        this.showToast('Error: Usuario no autenticado.', 'error');
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
