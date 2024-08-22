import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'; //Importar router para usar la navegacion

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(private router: Router) { } //Constructor privado

  ngOnInit() {
    this.router.navigate(['/login']) //Splash redirect a login
  }

}
