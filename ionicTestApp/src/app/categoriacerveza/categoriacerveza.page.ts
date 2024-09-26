import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SessionManager } from 'src/managers/SessionManager'; 
@Component({
  selector: 'app-categoriacerveza',
  templateUrl: './categoriacerveza.page.html',
  styleUrls: ['./categoriacerveza.page.scss'],
})
export class CategoriacervezaPage implements OnInit {

  constructor(private router: Router,private menuController: MenuController,private sessionManager: SessionManager) { }

  ngOnInit() {
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
}
