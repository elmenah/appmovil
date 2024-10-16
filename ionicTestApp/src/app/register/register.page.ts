import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { SessionManager } from 'src/managers/SessionManager';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  username: string = '';
  email: string = '';
  password: string = '';
  termsAccepted: boolean = false;  // Se usa para almacenar si los TYC están aceptados

  constructor(
    private router: Router,
    private alertController: AlertController,
    private sessionManager: SessionManager 
  ) {}

  async onRegisterButtonPressed() {
    // Verificamos si los términos y condiciones han sido aceptados
    if (!this.termsAccepted) {
      alert('Debe aceptar los términos y condiciones');
      return;
    }

    // Verificamos si todos los campos están completos
    if (!this.username || !this.email || !this.password) {
      alert('Por favor completa todos los campos');
      return;
    }

    // Verificamos que el correo sea válido
    if (!this.validateEmail(this.email)) {
      alert('Por favor introduce un correo electrónico válido');
      return;
    }

    // Verificamos que la contraseña sea válida
    if (!this.validatePassword(this.password)) {
      alert('La contraseña debe tener al menos 6 caracteres y debe incluir letras mayúsculas y minúsculas.');
      return;
    }

    // Se crea una constante usando el método performRegister
    const isRegistered = await this.performRegister(this.email, this.password, this.username);
    
    if (isRegistered) {
      await this.presentAlert();
      this.router.navigate(['/login']); // Redirige al usuario
    } else {
      alert('Error en el registro. Por favor intenta de nuevo.');
    }
  }

  async performRegister(email: string, password: string, username: string): Promise<boolean> {
    const auth = getAuth();
    const db = getFirestore();
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      const user = userCredential.user;

      // Guarda el nombre de usuario en Firestore
      await setDoc(doc(db, 'usuarios', user.uid), {
        
        username: username,
        email: email
      });
      console.log('Se creo y guardo exitosamente el usuario',username)
      return true; // Registro exitoso
      
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      return false; // Registro fallido
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Registro exitoso',
      message: 'Su cuenta se registró correctamente',
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
