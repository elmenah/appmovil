import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionManager } from 'src/managers/SessionManager'; // Importa desde la ruta correcta

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(private router: Router, private sessionManager: SessionManager) { }

  async ngOnInit() {
    setTimeout(async () => {
      // Verificar si el instructivo ya ha sido saltado
      if (localStorage.getItem('instructivoSeen') !== 'true') {
        this.router.navigate(['/instructivo1']); // Si no lo ha saltado, muestra el instructivo
      } else {
        // Usa await para esperar la resolución de isLoggedIn()
        const isLoggedIn = await this.sessionManager.isLoggedIn();
        if (isLoggedIn) {
          this.router.navigate(['/home']); // Si está logueado, redirige al Home
        } else {
          this.router.navigate(['/login']); // Si no está logueado, redirige al Login
        }
      }
    }, 2000); // Espera de 2 segundos antes de redirigir
  }
}