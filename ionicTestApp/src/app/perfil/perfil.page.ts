import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { UserLogoutUseCase } from 'src/app/use-cases/user-logout.user-case';
import { StorageService } from 'src/managers/StorageService';
import { UserUpdateUseCase } from 'src/app/use-cases/user-update.use-case';
import { CancelAlertService } from 'src/managers/CancelAlertService';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  userEmail: string = '';
  userName: string = '';
  userPhotoURL: string = 'assets/default-avatar.png';

  constructor(
    private storageService: StorageService,
    private Router: Router,
    private userUpdateUseCase: UserUpdateUseCase,
    private UserLogoutUseCase: UserLogoutUseCase,
    private alert: CancelAlertService
  ) {}

  async ngOnInit() {
    const user = await this.storageService.get('user');

    if (user) {
      // Chequeo de email, si es nulo o vacío, asignar valor por defecto
      this.userEmail =
        user.email && user.email.trim() !== ''
          ? user.email
          : 'Correo no disponible';

      // Chequeo de nombre
      this.userName =
        user.nombreusuario || this.storageService.get('nombreuser') ;

      // Chequeo de foto, si es nula o vacía, asignar foto por defecto
      this.userPhotoURL =
        user.photoURL && user.photoURL.trim() !== ''
          ? user.photoURL
          : 'assets/default-avatar.png';
    }
  }

  async onUpdateButtonPressed() {
    const result = await this.userUpdateUseCase.performUserUpdate(
      this.userName
    );

    if (result.success) {
      this.alert.showAlert(
        'Actualización Exitosa',
        'Tu perfil ha sido actualizado correctamente.',
        () => {}
      );
    } else {
      this.alert.showAlert('Error', result.message, () => {});
    }
  }
  perfil() {
    this.Router.navigate(['/perfil']);
  }

  carrito() {
    this.Router.navigate(['/carrito']);
  }

  logout() {
    this.alert.showAlert(
      'Cerrar sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      async () => {
        this.UserLogoutUseCase.performLogout();
        this.Router.navigate(['/comienzo']);
      },
      () => {}
    );
  }
}
