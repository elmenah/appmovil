import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionManager } from 'src/managers/SessionManager';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router,private menuController: MenuController,private alertController: AlertController, private sessionManager: SessionManager) { }

    user: string = '';
    password: string = '';

  ngOnInit() {
    this.menuController.enable(true);
  }

  async onLoginButtonPressed() {
    // Primero verifica si los campos están vacíos antes de intentar el login
    if (this.user === '' || this.password === '') {
      alert('Por favor completa todos los campos');
      return;
    }
  
    // Si las credenciales son válidas, navega al home
  const loginSuccess = await this.sessionManager.performLogin(this.user, this.password);
  if (loginSuccess) {
    await this.sessionManager.setSession(true);
    await this.presentWelcomeAlert(this.user);
    this.router.navigate(['/home']);
  } else {
    this.user = '';
    this.password = '';
    alert('Las credenciales ingresadas son inválidas.');
  }
}

async onLoginButtonGoogle(){

const loginSucces = await this.sessionManager.loginWithGoogle();
if (loginSucces)
{

this.router.navigate(['/splash']);
} else{

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

