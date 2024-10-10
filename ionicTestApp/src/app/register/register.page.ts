import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { SessionManager } from 'src/managers/SessionManager';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  username: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private sessionManager: SessionManager // Inyecta SessionManager
  ) {}

  async onRegisterButtonPressed() {
    if (!this.username || !this.email || !this.password) {
      alert('Por favor completa todos los campos');
      return;
    }

    if (!this.validateEmail(this.email)) {
      alert('Por favor introduce un correo electrónico válido');
      return;
    }

    if (!this.validatePassword(this.password)) {
      alert('La contraseña debe tener al menos 6 caracteres y debe incluir letras mayúsculas y minúsculas.');
      return;
    }

    // Se crea una constante usando el metodo perfomRegister
    const isRegistered = await this.sessionManager.performRegister(this.email, this.password);
    
    if (isRegistered) {
      await this.presentAlert();
      this.router.navigate(['/home']); // Redirige al usuario
    } else {
      alert('Error en el registro. Por favor intenta de nuevo.');
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Registro exitoso',
      message: 'Bienvenido a terraza, su cuenta se registró correctamente',
      buttons: ['OK']
    });

    await alert.present();
  }

  validateEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  validatePassword(password: string): boolean {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return passwordPattern.test(password);
  }

  async onLoginButtonPressed() {
    this.router.navigate(['/login']);
  }
}