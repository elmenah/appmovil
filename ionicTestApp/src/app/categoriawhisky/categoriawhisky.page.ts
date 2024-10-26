import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SessionManager } from 'src/managers/SessionManager';
import { AngularFirestore } from '@angular/fire/compat/firestore';

interface Whisky {
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

@Component({
  selector: 'app-categoriawhisky',
  templateUrl: './categoriawhisky.page.html',
  styleUrls: ['./categoriawhisky.page.scss'],
})
export class CategoriawhiskyPage implements OnInit {
  whiskies: Whisky[] = []; 

  constructor(
    private router: Router,
    private menuController: MenuController,
    private sessionManager: SessionManager,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.loadWhiskies();
  }

  carrito() {
    this.router.navigate(['/carrito']);
  }

  perfil() {
    this.router.navigate(['/perfil']);
  }

  // Método para cargar los whiskies desde Firestore
  loadWhiskies() {
    this.firestore.collection('packs whiskies').snapshotChanges().subscribe((whiskiesSnapshot) => {
      this.whiskies = [];
      whiskiesSnapshot.forEach((doc: any) => {
        const whisky = doc.payload.doc.data() as Whisky;
        this.whiskies.push({
          name: whisky.name || 'Nombre desconocido',
          price: whisky.price || 0,
          imageUrl: whisky.imageUrl || 'assets/img/default.jpg', // Imagen por defecto
          category: whisky.category || 'Sin categoría',
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

  logout() {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
      this.sessionManager.performLogout();
      this.router.navigate(['/login']);
    }
  }

  verProducto(whisky: Whisky) {
    this.router.navigate(['/whisky'], { state: { product: whisky } });
  }

  palhome() {
    this.router.navigate(['/home']);
    this.menuController.close();
  }
}
