import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { HttpClient } from '@angular/common/http'; 
@Component({
  selector: 'app-admin',
  templateUrl: 'admin.page.html',
  styleUrls: ['admin.page.scss'],
})
export class AdminPage implements OnInit {
  products: any[] = [];
  newProduct = { name: '', description: '', price: 0, category: '' };
  

  constructor(private productService: ProductService,private http: HttpClient) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      console.log(this.products); // Muestra los productos con su 'id'
    });
  }

  addProduct() {
    this.productService.addProduct(this.newProduct).subscribe(
      () => {
        console.log('Producto agregado');
        this.loadProducts();
        this.newProduct = { name: '', description: '', price: 0, category: '' }; // Resetear el formulario
      },
      (error) => {
        console.error('Error al agregar producto', error);
      }
    );
  }

  deleteProductById(id: string) {
    this.productService.deleteProduct(id).then(() => {
      console.log('Producto eliminado con éxito');
    }).catch(error => {
      console.error('Error al eliminar el producto: ', error);
    });
  }
}
