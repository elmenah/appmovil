import { Injectable } from '@angular/core';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { StorageService } from 'src/managers/StorageService';

@Injectable({
  providedIn: 'root',
})
export class UserLoginGoogleUseCase {
  public userName: string | null = null;
  correo: string | null = null;

  constructor(private storageService: StorageService) {}

  // Método para iniciar sesión con Google
  async loginWithGoogle(): Promise<{ success: boolean; message: string }> {
    try {
      const auth = getAuth();  // Obtenemos la instancia de Auth
      const provider = new GoogleAuthProvider();  // Creamos el proveedor de Google
      
      
      
      // Iniciar sesión con Google
      const result = await signInWithPopup(auth, provider);  // Iniciamos sesión con el popup

      // Obtener información del usuario autenticado
      const user = result.user;
      const userName = user.displayName || null;
      const correo = user.email;

      // Guardar la información del usuario en Ionic Storage
      await this.storageService.set('nombreuser', userName);
      await this.storageService.set('isLoggedIn', true);
      await this.storageService.set('user', {
        nombreusuario: userName,
        email: correo || ''
      });

      console.log('Login exitoso:', result);
      return { success: true, message: 'Login successful' };
    } catch (error: any) {
      console.error('Error durante el inicio de sesión:', error);
      let errorMessage = 'Login unsuccessful';
      if (error.code) {
        errorMessage = `Error: ${error.message || error.code}`;
      }
      return { success: false, message: errorMessage };
    }
  }
}
