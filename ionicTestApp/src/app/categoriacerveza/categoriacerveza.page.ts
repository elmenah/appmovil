import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-categoriacerveza',
  templateUrl: './categoriacerveza.page.html',
  styleUrls: ['./categoriacerveza.page.scss'],
})
export class CategoriacervezaPage implements OnInit {

  constructor(private router: Router,private menuController: MenuController) { }

  ngOnInit() {
  }
  openSecondaryMenu() {
    this.menuController.open('secondary-menu');
  }
  logout(){
    this.router.navigate(['/login']);
  }
}
