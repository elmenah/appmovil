import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionManager } from 'src/managers/SessionManager';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
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
    private sessionManager: SessionManager,
    private afAuth: AngularFireAuth, 
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
      const user = await this.afAuth.currentUser; // Obtiene el usuario autenticado
      if (user) {
        const userName = user.displayName || 'Usuario'; // Si no hay displayName, usa un valor por defecto
        await this.storage.set('usuario', userName); // Guarda el nombre de usuario en Ionic Storage
        console.log('Nombre de usuario guardado en storage:', userName);
      }
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
      const user = await this.afAuth.currentUser; // Obtiene el usuario autenticado
      if (user) {
        const userName = user.displayName; // Obtiene el nombre de usuario de Google
        await this.storage.set('usuario', userName); // Guarda el nombre de usuario en Ionic Storage
        console.log('Nombre de usuario:', userName); // Aquí puedes manejar el nombre del usuario

        const instructivoSeen = await this.storage.get('instructivoSeen');
        this.router.navigate(['/splash']);
      }
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
        message: 'Si el correo esta registrado en La Terraza, te enviamos un enlace para restablecer tu contraseña',
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
