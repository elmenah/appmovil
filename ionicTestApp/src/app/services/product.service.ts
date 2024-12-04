import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/api/products';
  constructor(private firestore: AngularFirestore, private http: HttpClient) {}

  // Obtener todos los productos con su ID
  getProducts(): Observable<any[]> {
    return this.firestore.collection('pack vinos').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
  
        // Verifica si 'data' es un objeto
        if (typeof data === 'object' && data !== null) {
          return { id, ...data };  // Solo aplicamos el spread si 'data' es un objeto
        } else {
          console.error('Data no es un objeto', data);
          return { id };  // En caso de que no sea un objeto, solo devolvemos el id
        }
      }))
    );
  }

  // Añadir un producto
  addProduct(product: any): Observable<any> {
    return new Observable((observer) => {
      this.firestore
        .collection('pack vinos')
        .add(product)
        .then((docRef) => {
          observer.next(docRef);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  deleteProduct(id: string): Promise<void> {
    return this.firestore.collection('pack vinos').doc(id).delete();
  }
}
