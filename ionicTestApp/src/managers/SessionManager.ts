import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';


import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class SessionManager {
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
      await this.afAuth.signInWithEmailAndPassword(email, password);
      await this.setSession(true); // Guarda que el usuario está logueado
      return true;
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      return false;
    }
  }

  // Registro de usuario
  async performRegister(email: string, password: string): Promise<boolean> {
    try {
      await this.afAuth.createUserWithEmailAndPassword(email, password);
      await this.setSession(true); // Guarda que el usuario está logueado
      return true;
    } catch (error) {
      console.error('Error en el registro:', error);
      return false;
    }
  }

  // Obtener el nombre de usuario
async obtenerUser(): Promise<string | null> {
  const user = await this.afAuth.currentUser; // Usa await para obtener el usuario actual
  return user ? user.displayName : null; // Devuelve el nombre de usuario o null si no está autenticado
}


  // Lógica para cerrar sesión
  async performLogout(): Promise<void> {
    await this.afAuth.signOut(); // Cierra sesión en Firebase
    await this.setSession(false); // Establece que el usuario no está logueado
  }
}
