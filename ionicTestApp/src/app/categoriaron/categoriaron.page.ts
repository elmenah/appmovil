import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SessionManager } from 'src/managers/SessionManager';
import { AngularFirestore } from '@angular/fire/compat/firestore';

interface Ron {
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

@Component({
  selector: 'app-categoriaron',
  templateUrl: './categoriaron.page.html',
  styleUrls: ['./categoriaron.page.scss'],
})
export class CategoriaronPage implements OnInit {
  rones: Ron[] = []; 

  constructor(
    private router: Router,
    private menuController: MenuController,
    private sessionManager: SessionManager,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.loadRones();
  }

  carrito() {
    this.router.navigate(['/carrito']);
  }

  perfil() {
    this.router.navigate(['/perfil']);
  }

  // Método para cargar los rones desde Firestore
  loadRones() {
    // Obtiene todos los documentos de la colección 'packs rones'
    this.firestore.collection('packs ron').snapshotChanges().subscribe((ronesSnapshot) => {
      this.rones = [];
      ronesSnapshot.forEach((doc: any) => {
        const ron = doc.payload.doc.data() as Ron;
        this.rones.push({
          name: ron.name || 'Nombre desconocido',
          price: ron.price || 0,
          imageUrl: ron.imageUrl || 'assets/img/default.jpg', // Imagen por defecto
          category: ron.category || 'Sin categoría',
        });
      });
    });
  }

  ionViewWillEnter() {
    this.menuController.enable(true, 'main-menu');
    this.menuController.enable(true, 'secondary-menu');
  }

  openSecondaryMenu() {
    this.menuController.open('secondary-menu');
  }

 

  verProducto(ron: Ron) {
    this.router.navigate(['/ron'], { state: { product: ron } });
  }

  palhome() {
    this.router.navigate(['/home']);
    this.menuController.close();
  }
}
