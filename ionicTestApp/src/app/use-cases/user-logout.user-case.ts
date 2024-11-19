import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signOut } from 'firebase/auth';
import { StorageService } from 'src/managers/StorageService';

@Injectable({
  providedIn: 'root',
})
export class UserLogoutUseCase {

  constructor(
    private fireAuth: AngularFireAuth,
    private storageService: StorageService
  ) {}

  async performLogout(): Promise<{ success: boolean; message: string }> {
    try {
      const auth = getAuth();
      await signOut(auth);

      
      await this.storageService.remove('isLoggedIn');
      await this.storageService.remove('user');
      await this.storageService.remove('nombreuser');
      await this.storageService.remove('cart');
      return { success: true, message: "Sesión finalizada" };
    } catch (error: any) {
      let errorMessage = 'No se pudo cerrar sesión';

      if (error.message) {
        errorMessage += ': ' + error.message;
      }

      return { success: false, message: errorMessage };
    }
  }
}