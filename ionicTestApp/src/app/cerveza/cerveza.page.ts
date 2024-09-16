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

  ngOnInit() {
  }
  openSecondaryMenu() {
    this.menuController.open('secondary-menu');
  }
  logout(){
    this.router.navigate(['/login']);
  }
}
