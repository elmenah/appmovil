import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private router: Router, private alertController: AlertController) {}

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

    // Guardar los datos del usuario en Local Storage
    const userData = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    localStorage.setItem('user', JSON.stringify(userData));

    await this.presentAlert();
    this.router.navigate(['/home']);
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
}
