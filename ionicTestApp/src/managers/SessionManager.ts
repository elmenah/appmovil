import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';


import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
@Injectable({
  providedIn: 'root',
})
export class SessionManager {
  public userName: string | null = null;
  constructor(private storage: Storage, private afAuth: AngularFireAuth) {
    this.init();
  }

  // Inicializa el storage
  async init() {
    await this.storage.create();
  }

  // Guarda el estado del login en Ionic Storage
  async setSession(isLoggedIn: boolean): Promise<void> {
    await this.storage.set('isLoggedIn', isLoggedIn);
  }

  // Verifica si el usuario está logueado usando Ionic Storage
  async isLoggedIn(): Promise<boolean> {
    const session = await this.storage.get('isLoggedIn');
    return session ? session : false;
  }


  
  // Lógica para iniciar sesión con Firebase
  async performLogin(email: string, password: string): Promise<boolean> {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      await this.setSession(true); // Guarda que el usuario está logueado
      this.userName = result.user?.email|| null;
      await this.storage.set('userName', this.userName);
      return true;
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      return false;
    }
  }

// Método para iniciar sesión con Google
  async loginWithGoogle() {
    try {
        const result = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
        this.userName = result.user?.displayName || null;
        await this.setSession(true);
        await this.storage.set('userName', this.userName); // Guarda el nombre de usuario
        console.log('Login exitoso:', result);
        return true;
    } catch (error) {
        console.error('Error durante el inicio de sesión:', error);
        return false;
    }
 }
 

  // Registro de usuario
  async performRegister(email: string, password: string): Promise<boolean> {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
       // Envía el correo de verificación
      await result.user?.sendEmailVerification();
      await this.setSession(true); // Guarda que el usuario está logueado
      return true;
    } catch (error) {
      console.error('Error en el registro:', error);
      return false;
    }
  }

  


  // Lógica para cerrar sesión
  async performLogout(): Promise<void> {
    
    await this.afAuth.signOut(); // Cierra sesión en Firebase
    await this.setSession(false); // Establece que el usuario no está logueado
    await this.storage.remove('userName');
    
  }
}
