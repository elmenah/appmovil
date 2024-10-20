
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { PedidosService } from '../pedidos.service'; 
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  cart: any[] = []; // Arreglo para almacenar los productos del carrito
  username: string = '';
  sucursal: string = '';

  constructor(private storage: Storage, private pedidosService: PedidosService,private alertController: AlertController, private menuController: MenuController ) {}

  ngOnInit() {
    this.loadCart(); // Cargar el carrito desde localStorage
    this.loadUserData(); // Cargar el nombre de usuario y sucursal desde Ionic Storage
  }

  // Cargar el carrito desde localStorage
  loadCart() {
    this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
  }

  // Cargar el nombre de usuario y sucursal desde Ionic Storage
  async loadUserData() {
    const Usuario = await this.storage.get('usuario');  // Suponiendo que tienes un 'username' guardado en el storage
    const sucursal = await this.storage.get('sucursalSeleccionada');
    
    if (Usuario && sucursal) {
      this.username = Usuario;
      this.sucursal = sucursal;
    }
  }

  // Método para realizar la reserva
  reserve() {
    if (this.cart.length === 0) {
      alert('Tu carrito está vacío.');
      return;
    }

    // Se llama al funcion saveOrder que a su vez llama al servicio pedidos
    this.saveOrder();
  }

  // Guardar el pedido en Firestore
  async saveOrder() {
    const order = {
      username: this.username, // Nombre de usuario
      products: this.cart,
      sucursal: this.sucursal,  // Sucursal seleccionada
      total: this.calculateTotal(),
      date: new Date()
    };

    // Guardar el pedido en Firestore
    this.pedidosService.saveOrder(order).then(async () => {
      const alert = await this.alertController.create({
        header: 'Pedido realizado',
        message: `Ya puede retirar su pedido en la sucursal ${this.sucursal}` ,
        buttons: ['OK'],
      });
      await alert.present();
      this.clearCart(); // Limpiar el carrito después de realizar la reserva
    }).catch((error) => {
      console.error('Error al guardar el pedido:', error);
      alert('Ocurrió un error al realizar el pedido.');
    });
  }

  // Calcular el total del carrito
  calculateTotal() {
    return this.cart.reduce((total, product) => total + product.price, 0);
  }

  // Limpiar el carrito
  clearCart() {
    localStorage.removeItem('cart');
    this.cart = [];
  }

  openSecondaryMenu() {
    this.menuController.open('secondary-menu');
  }
}
