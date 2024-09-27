// product-page.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent {

  // Define los datos que el componente recibirá
  @Input() product: { 
    name: string, 
    description: string, 
    price: number, 
    imageUrl: string, 
    category: string 
  } = {
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    category: ''
  };
  

  // Método para añadir el producto al carrito
  addToCart() {
    console.log(`${this.product.name} añadido al carrito.`);
    // Lógica para añadir al carrito (puedes implementar localStorage, API, etc.)
  }
}
