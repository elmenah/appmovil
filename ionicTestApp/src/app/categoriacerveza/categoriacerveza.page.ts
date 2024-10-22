import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SessionManager } from 'src/managers/SessionManager';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

interface Cerveza {
  name: string;
  
  price: number;
  imageUrl: string;
  category: string;
}

@Component({
  selector: 'app-categoriacerveza',
  templateUrl: './categoriacerveza.page.html',
  styleUrls: ['./categoriacerveza.page.scss'],
})
export class CategoriacervezaPage implements OnInit {
  cervezas: Cerveza[] = []; 
  constructor(
    private router: Router,
    private menuController: MenuController,
    private sessionManager: SessionManager,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.loadCervezas();
  }

  carrito(){
    this.router.navigate(['/carrito']);
  }

  perfil() {
    this.router.navigate(['/perfil'])
  }
  // Método para cargar las cervezas desde Firestore
  loadCervezas() {
    // Obtiene todos los documentos de la colección 'packs cervezas'
    this.firestore.collection('packs cervezas').snapshotChanges().subscribe((cervezasSnapshot) => {
      // Limpiar el arreglo cervezas antes de agregar los nuevos datos
      this.cervezas = [];

      cervezasSnapshot.forEach((doc: any) => {
        const cerveza = doc.payload.doc.data() as Cerveza;
        
        // Agregar la cerveza al arreglo cervezas
        this.cervezas.push({
          name: cerveza.name || 'Nombre desconocido',
          
          price: cerveza.price || 0,
          imageUrl: cerveza.imageUrl || 'assets/img/default.jpg', // Imagen por defecto
          category: cerveza.category || 'Sin categoría',
        });
      });
    });
  }

  ionViewWillEnter() {
    this.menuController.enable(true, 'main-menu'); // Habilita el menú principal
    this.menuController.enable(true, 'secondary-menu'); // Habilita el menú secundario
  }

  openSecondaryMenu() {
    this.menuController.open('secondary-menu');
  }

  logout() {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
      this.sessionManager.performLogout(); // Limpiar sesión
      // Redirigir a la página de login
      this.router.navigate(['/login']);
    }
  }

  verProducto(cerveza: Cerveza) {
    this.router.navigate(['/cerveza'], { state: { product: cerveza } });
  }

  palhome() {
    this.router.navigate(['/home']);
    this.menuController.close();
  }
}
