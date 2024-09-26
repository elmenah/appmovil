import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SessionManager } from 'src/managers/SessionManager'; // Importar el session manager desde la ruta correcta
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  email: string = '';  // Variable para almacenar el email ingresado
  searchQuery: string = '';
  categories: string[] = ['Cervezas', 'Vinos', 'Ron', 'Whisky'];
  isAuthenticated: boolean = false; // Variable para verificar autenticación
  countdown: string = '';
  endTime: number = Date.now() + 24 * 60 * 60 * 1000; // Tiempo final en 24 horas
  usuario: string = this.sessionManager.obteneruser(); 
  

  

  //Lista de productos con review
  Productswithreview = [
    {
      name: 'Whisky Jack Daniels',
      
      rating: 4.5,
      reviews: [
        { user: 'Juan', comment: 'Excelente calidad', rating: 5 },
        { user: 'Maria', comment: 'Muy bueno', rating: 4 }
      ]
    },
    {
      name: 'Ron Bacardi',
      
      rating: 4.0,
      reviews: [
        { user: 'Carlos', comment: 'Buen sabor', rating: 4 }
      ]
    }
  ];


  constructor(private router: Router, private menuController: MenuController,private sessionManager: SessionManager,private toastController: ToastController) {}

  ngOnInit() {
    
    this.startCountdown();
    
  }
  
   // Función para redirigir a la categoría seleccionada
   goToCategory(category: string) {
    if (category === 'Cervezas') {
      this.router.navigate(['/categoriacerveza']);  // Redirige a la página de cervezas
    } else if (category === 'Vinos') {
      this.router.navigate(['/vinos']);     // Redirige a la página de vinos
    } else if (category === 'Ron') {
      this.router.navigate(['/ron']);       // Redirige a la página de ron
    } else if (category === 'Whisky') {
      this.router.navigate(['/whisky']);    // Redirige a la página de whisky
    }
  }
  startCountdown() {
    const interval = setInterval(() => {
      const now = Date.now();
      const timeLeft = this.endTime - now;
  
      if (timeLeft <= 0) {
        clearInterval(interval);
        this.countdown = '0h 0m 0s';
      } else {
        const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
        const seconds = Math.floor((timeLeft / 1000) % 60);
        this.countdown = `${hours}h ${minutes}m ${seconds}s`;  // <-- Corrected template literal
      }
    }, 1000);
  }
  
  
  ionViewWillLeave() {
    localStorage.setItem('endTime', this.endTime.toString());
  }


  openSecondaryMenu() {
    this.menuController.open('secondary-menu');
  }

  logout() {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
      this.sessionManager.performLogout();  // Clear session
      this.router.navigate(['/login']);     // Redirect to login page
    }
  }
   // Método para manejar la suscripción al boletín
   subscribeToNewsletter() {
    if (this.email && this.validateEmail(this.email)) {
      
      console.log('Email suscrito:', this.email);
      this.presentToast('¡Te has suscrito al boletín con éxito!');
      this.email = '';  // Limpiar el input después de suscribirse
    } else {
      this.presentToast('Por favor, ingresa un email válido.');
    }
  }

  // Validación básica de email
  validateEmail(email: string): boolean {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  // Método para mostrar un mensaje de notificación
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,  // Duración del mensaje (2 segundos)
      position: 'bottom'
    });
    toast.present();
  }

  

}
