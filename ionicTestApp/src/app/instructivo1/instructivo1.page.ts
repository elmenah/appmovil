import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-instructivo1',
  templateUrl: './instructivo1.page.html',
  styleUrls: ['./instructivo1.page.scss'],
})
export class Instructivo1Page implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    // Marcar el instructivo como visto cuando la página se cargue
    localStorage.setItem('instructivoSeen', 'true');
  }
  next1(){
    this.router.navigate(['/instructivo2']);
  }
  skip() {
    localStorage.setItem('instructivoSeen', 'true'); // Almacena que el usuario ha hecho "Skip"
    this.router.navigate(['/login']); // Redirige al Home después de saltarlo
  }
}
