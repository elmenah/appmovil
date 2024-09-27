import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cerveza',
  templateUrl: './cerveza.page.html',
  styleUrls: ['./cerveza.page.scss'],
})
export class CervezaPage implements OnInit {

  constructor(private router: Router,private menuController: MenuController) { }

  producto1 = {
    name: 'Cerveza',
    description: 'Descripción del producto 1',
    price: 20.99,
    imageUrl: 'assets/img/producto1.jpg',
    category: 'Categoría 1'
  };

  producto2 = {
    name: 'Producto 2',
    description: 'Descripción del producto 2',
    price: 30.99,
    imageUrl: 'assets/img/producto2.jpg',
    category: 'Categoría 2'
  };
  ngOnInit() {
  }
  openSecondaryMenu() {
    this.menuController.open('secondary-menu');
  }
  logout(){
    this.router.navigate(['/login']);
  }
}
