import { Injectable } from '@angular/core';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { StorageService } from 'src/managers/StorageService';

@Injectable({
  providedIn: 'root',
})
export class UserLoginGoogleUseCase {
  public userName: string | null = null;

  constructor(private storageService: StorageService) {}

  // Método para iniciar sesión con Google
  async loginWithGoogle(): Promise<{ success: boolean; message: string }> {
    try {
      const auth = getAuth();  // Obtenemos la instancia de Auth
      const provider = new GoogleAuthProvider();  // Creamos el proveedor de Google
      const result = await signInWithPopup(auth, provider);  // Iniciamos sesión con el pop-up

      this.userName = result.user?.displayName || null;
      this.storageService.set('nombreuser', this.userName);

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
