import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CancelAlertService } from 'src/managers/CancelAlertService'; // Asegúrate de tener el servicio de alertas
import { UserLoginUseCase } from 'src/app/use-cases/user-login.use-case';
import { AlertController } from '@ionic/angular';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private userLoginUseCase: UserLoginUseCase,
    private alert: CancelAlertService,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  async onLoginButtonPressed() {
    const result = await this.userLoginUseCase.performLogin(this.email, this.password);

    if (result.success) {
      this.alert.showAlert(
        'Login exitoso',
        'Has iniciado sesión correctamente.',
        () => {
          this.router.navigate(['/splash']); // Navegar a 'splash' cuando el usuario presiona "Aceptar"
        }
      );
    } else {
      this.alert.showAlert(
        'Error',
        result.message,
        () => {
          // Se puede agregar alguna lógica aquí si es necesario
        }
      );
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
