import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-instructivo1',
  templateUrl: './instructivo1.page.html',
  styleUrls: ['./instructivo1.page.scss'],
})
export class Instructivo1Page implements OnInit {

  constructor(private router: Router,private storage: Storage) { }

  async ngOnInit() {
    
    // Marcar el instructivo como visto cuando la página se cargue
    await this.storage.set('instructivoSeen', true);
  }

  next1(){
    this.router.navigate(['/instructivo2']);
  }
  skip() {
     
    this.router.navigate(['/login']); // Redirige al Home después de saltarlo
  }
}
