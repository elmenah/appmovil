import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionManager } from 'src/managers/SessionManager';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router,private alertController: AlertController, private sessionManager: SessionManager) { }

    user: string = '';
    password: string = '';

  ngOnInit() {
  }

  async onLoginButtonPressed() {
    // Primero verifica si los campos están vacíos antes de intentar el login
    if (this.user === '' || this.password === '') {
      alert('Por favor completa todos los campos');
      return;
    }
  
    // Si los campos están completos, intenta iniciar sesión
    if (this.sessionManager.performLogin(this.user, this.password)) {
      await this.presentWelcomeAlert(this.user);
      this.router.navigate(['/home']);
    } else {
      // Si las credenciales son inválidas, reinicia los campos y muestra el mensaje
      this.user = '';
      this.password = '';
      alert('Las credenciales ingresadas son inválidas.');
    }
  }

  async presentWelcomeAlert(username: string) {
    const alert = await this.alertController.create({
      header: 'Bienvenido',
      message: `Bienvenido a la terraza, ${username}`,
      buttons: ['OK']
    });
    await alert.present();
  }

  onRegisterButtonPressed() {
    this.router.navigate(['/register'])
  }

}

