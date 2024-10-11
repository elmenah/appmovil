import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionManager } from 'src/managers/SessionManager'; // Importa desde la ruta correcta
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(private router: Router, private sessionManager: SessionManager,private alertController: AlertController,private storage: Storage) { }

  async ngOnInit() {
    setTimeout(async () => {
      // Verificar si el instructivo ya ha sido saltado
      if (localStorage.getItem('instructivoSeen') !== 'true') {
        this.router.navigate(['/instructivo1']); // Si no lo ha saltado, muestra el instructivo
      } else {
        // Usa await para esperar la resolución de isLoggedIn()
        const isLoggedIn = await this.sessionManager.isLoggedIn();
        if (isLoggedIn) {
          this.router.navigate(['/sucursales']); // Si se logea elige la sucursal
          
        } else {
          this.router.navigate(['/login']); // Si no está logueado, redirige al Login
        }
      }
    }, 2000); // Espera de 2 segundos antes de redirigir
  }
  
  
}
