import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionManager } from 'src/managers/SessionManager';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router,private menuController: MenuController,private storage: Storage,private alertController: AlertController, private sessionManager: SessionManager) { }

    user: string = '';
    password: string = '';

  ngOnInit() {
    this.menuController.enable(true);
  }

  async onLoginButtonPressed() {
    // Primero verifica si los campos están vacíos antes de intentar el login
    if (this.user === '' || this.password === '') {
      alert('Por favor completa todos los campos');
      return;
    }
  
    // Si las credenciales son válidas, navega al home
  const loginSuccess = await this.sessionManager.performLogin(this.user, this.password);
  if (loginSuccess) {
    await this.sessionManager.setSession(true);
    
    this.router.navigate(['/sucursales']);
  } else {
    this.user = '';
    this.password = '';
    alert('Las credenciales ingresadas son inválidas.');
  }
}

async onLoginButtonGoogle(){

const loginSucces = await this.sessionManager.loginWithGoogle();
if (loginSucces)
{
const instructivoSeen = await this.storage.get('instructivoSeen');
this.router.navigate(['/splash']);
} else{

  alert('Las credenciales ingresadas son inválidas.');
}

}

  

  onRegisterButtonPressed() {
    this.router.navigate(['/register'])
  }

}

