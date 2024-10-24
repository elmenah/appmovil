// product-page.component.ts
import { Component, Input } from '@angular/core';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent {

  // Define los datos que el componente recibirá
  @Input() product: { 
    name: string, 
     
    price: number, 
    imageUrl: string, 
    category: string 
  } = {
    name: '',
    
    price: 0,
    imageUrl: '',
    category: ''
  };
  // Inyectar AlertController
  constructor(private alertController: AlertController) {}
  

  // Método para añadir el producto al carrito
  async addToCart() {
    console.log(`${this.product.name} añadido al carrito.`);

    // Obtener carrito desde localStorage o inicializar uno vacío
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');

    // Agregar el producto al carrito
    cart.push(this.product);

    // Guardar el carrito actualizado
    localStorage.setItem('cart', JSON.stringify(cart));

    console.log('Carrito actualizado:', cart);
    const alert = await this.alertController.create({
      
      message: 'El producto se añadio al carro',
      buttons: ['OK']
    });
    await alert.present();
  }
}
