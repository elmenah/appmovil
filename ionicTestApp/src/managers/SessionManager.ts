import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
@Injectable({
  providedIn: 'root',
})
export class SessionManager {
  private readonly temporaryUserName: string = 'Nicolas';
  private readonly temporaryPass: string = 'pass';

  constructor(private storage: Storage) {
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

  

   // Lógica para iniciar sesión
   async performLogin(user: string, password: string): Promise<boolean> {
    if (user === this.temporaryUserName && password === this.temporaryPass) {
      await this.setSession(true); // Guarda que el usuario está logueado
      return true;
    } else {
      return false;
    }
  }

  obteneruser() {
    const username = this.temporaryUserName;
    return username;
  }

  // Lógica para cerrar sesión
  async performLogout(): Promise<void> {
    await this.setSession(false); // Establece que el usuario no está logueado
  }
}
