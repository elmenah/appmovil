import { Component } from '@angular/core';
import { PopoverController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  searchQuery: string = '';
  categories: string[] = ['Cervezas', 'Vinos', 'Ron', 'Whisky'];
  isAuthenticated: boolean = false; // Variable para verificar autenticación

  featuredProducts = [
    { name: 'Whiskys', img: 'assets/imgs/whiskys.png' },
    { name: 'Vinos', img: 'assets/imgs/vinos.png' },
    { name: 'Cervezas', img: 'assets/imgs/cervezas.png' }
  ];

  constructor(private popoverController: PopoverController, private menuController: MenuController) {}

  ngOnInit() {
    
  }


  openSecondaryMenu() {
    this.menuController.open('secondary-menu');
  }

  

  

}
