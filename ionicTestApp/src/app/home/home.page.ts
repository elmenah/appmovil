import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  searchQuery: string = '';
  categories: string[] = ['Cervezas', 'Vinos', 'Ron', 'Whisky'];
  isAuthenticated: boolean = false; // Variable para verificar autenticación
  countdown: string = '';
  endTime: number = Date.now() + 24 * 60 * 60 * 1000; // Tiempo final en 24 horas


  featuredProducts = [
    { name: 'Whiskys', img: 'assets/imgs/whiskys.png' },
    { name: 'Vinos', img: 'assets/imgs/vinos.png' },
    { name: 'Cervezas', img: 'assets/imgs/cervezas.png' }
  ];

  constructor(private router: Router, private menuController: MenuController) {}

  ngOnInit() {
    const savedTime = localStorage.getItem('endTime');
    if (savedTime) {
      this.endTime = parseInt(savedTime, 10);
    }
    this.startCountdown();

  }
  startCountdown() {
    const interval = setInterval(() => {
      const now = Date.now();
      const timeLeft = this.endTime - now;
  
      if (timeLeft <= 0) {
        clearInterval(interval);
        this.countdown = '0h 0m 0s';
      } else {
        const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
        const seconds = Math.floor((timeLeft / 1000) % 60);
        this.countdown = `${hours}h ${minutes}m ${seconds}s`;  // <-- Corrected template literal
      }
    }, 1000);
  }
  

  ionViewWillLeave() {
    localStorage.setItem('endTime', this.endTime.toString());
  }


  openSecondaryMenu() {
    this.menuController.open('secondary-menu');
  }
  logout(){
    this.router.navigate(['/login']);
  }
  

  

}
