import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionManager } from 'src/managers/SessionManager';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(
    private router: Router, 
    private sessionManager: SessionManager,
    private storage: Storage
  ) {}

  async ngOnInit() {
    await this.storage.create(); // Inicializa el almacenamiento

    try {
      setTimeout(async () => {
        // Obtener el estado de "instructivoSeen" e "isLoggedIn" desde Ionic Storage
        const instructivoSeen = await this.storage.get('instructivoSeen');
        const isLoggedIn = await this.sessionManager.isLoggedIn();  // Usa sessionManager

        // Registrar los valores en la consola para depuración
        console.log('instructivoSeen:', instructivoSeen);
        console.log('isLoggedIn:', isLoggedIn);

        // Verificar si el instructivo ya ha sido visto
        if (!instructivoSeen) {
          // Si no ha visto el instructivo, redirige a la página de instructivo
          this.router.navigate(['/instructivo1']);
        } else if (isLoggedIn) {
          // Si ha visto el instructivo y está logueado, redirige a la selección de sucursales
          this.router.navigate(['/sucursales']);
        } else {
          // Si ha visto el instructivo pero no está logueado, redirige al login
          this.router.navigate(['/login']);
        }
      }, 2000); // Espera de 2 segundos antes de redirigir
    } catch (error) {
      console.error('Error durante la redirección en SplashPage:', error);
    }
  }
}
