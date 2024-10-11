import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {
  sucursal: string = '';
  promocionDelDia: any;
  ofertaDelDia: any;
  email: string = '';

  constructor(private storage: Storage,private toastController: ToastController) {}

  async ngOnInit() {
    console.log('ngOnInit called'); // Console log para verificar que se cargo la pagina
    this.sucursal = await this.storage.get('sucursalSeleccionada') || 'sucursal1'; //Se guarda en storage la sucursal seleccionada
    this.loadContentForSucursal(this.sucursal); //Dependiendo la sucursal es el contenido que se cargara en home
  }

  loadContentForSucursal(sucursal: string) {
    console.log('Sucursal seleccionada:', sucursal);
    if (sucursal === 'Viña') {
      this.promocionDelDia = {
        image: 'assets/img/cristal.jpg',
        description: 'Pack Cristal',
        discount: '50-40% OFF',
      };
      this.ofertaDelDia = {
        image: 'assets/img/whisky.jpg',
        countdown: '05:12:30',
      };
    } else if (sucursal === 'Valparaiso') {
      this.promocionDelDia = {
        image: 'assets/img/corona_650.jpg',
        description: 'Pack Corona',
        discount: '30% OFF',
      };
      this.ofertaDelDia = {
        image: 'assets/img/cristal.jpg',
        countdown: '03:15:40',
      };
    } else if (sucursal === 'Quilpue') {
      this.promocionDelDia = {
        image: 'assets/img/cristal.jpg',
        description: 'Pack Heineken',
        discount: '45% OFF',
      };
      this.ofertaDelDia = {
        image: 'assets/img/cristal.jpg',
        countdown: '02:18:50',
      };
    }
  }

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

  // Método para mostrar un mensaje de notificación
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,  // Duración del mensaje (2 segundos)
      position: 'bottom'
    });
    toast.present();
  }

  // Validación básica de email
  validateEmail(email: string): boolean {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}