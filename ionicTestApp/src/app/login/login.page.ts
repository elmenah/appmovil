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

  onLoginButtonPressed() {
    if(this.sessionManager.performLogin(this.user, this.password)) {//usa la clase session manager y le pasa por parametro user y password
      this.router.navigate(['/home'])
    } else {
      this.user=''
      this.password=''
      alert('Las credenciales ingresadas son inválidas.')
    }
    if (this.user === '' || this.password === '') {
      alert('Por favor completa todos los campos');
      return;
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
