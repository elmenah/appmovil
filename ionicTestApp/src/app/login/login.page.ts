import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionManager } from 'src/managers/SessionManager';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private menuController: MenuController,
    private storage: Storage,
    private alertController: AlertController,
    private sessionManager: SessionManager
  ) {}

  ngOnInit() {
    this.menuController.enable(true);
  }

  // Método para el login con usuario y contraseña
  async onLoginButtonPressed() {
    if (this.user === '' || this.password === '') {
      alert('Por favor completa todos los campos');
      return;
    }

    const loginSuccess = await this.sessionManager.performLogin(this.user, this.password);
    if (loginSuccess) {
      await this.sessionManager.setSession(true);
      this.router.navigate(['/sucursales']);
    } else {
      this.user = '';
      this.password = '';
      alert('Las credenciales ingresadas son inválidas.');
    }
  }

  // Método para login con Google
  async onLoginButtonGoogle() {
    const loginSuccess = await this.sessionManager.loginWithGoogle();
    if (loginSuccess) {
      const instructivoSeen = await this.storage.get('instructivoSeen');
      this.router.navigate(['/splash']);
    } else {
      alert('Las credenciales ingresadas son inválidas.');
    }
  }

  // Método para ir al formulario de registro
  onRegisterButtonPressed() {
    this.router.navigate(['/register']);
  }

  // Método para abrir el pop-up de recuperación de contraseña
  async recuperarclave() {
    const alert = await this.alertController.create({
      header: 'Recuperar Contraseña',
      message: 'Ingresa tu correo electrónico para recuperar tu contraseña.',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Correo electrónico',
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('El usuario canceló el formulario');
          }
        },
        {
          text: 'Enviar',
          handler: (data) => {
            if (data.email) {
              this.enviarCorreoRecuperacion(data.email);  // Llama a la función para enviar el correo
            }
          }
        }
      ]
    });

    await alert.present();
  }

  // Método para enviar el correo de recuperación
  async enviarCorreoRecuperacion(email: string) {
    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, email);//Metodo de firebase para recuperar la clave
      const alert = await this.alertController.create({
        header: 'Correo enviado',
        message: 'Revisa tu bandeja de entrada para restablecer tu contraseña.',
        buttons: ['OK']
      });
      await alert.present();
    } catch (error) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'No se pudo enviar el correo. Verifica tu dirección de correo electrónico.',
        buttons: ['OK']
      });
      await alert.present();
      console.error('Error al enviar correo de recuperación:', error);
    }
  }
}
