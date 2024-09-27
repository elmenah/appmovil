// components.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ProductPageComponent } from 'src/app/product-page/product-page.component';  // Importa el componente

@NgModule({
  declarations: [ProductPageComponent],  // Declara el componente
  imports: [CommonModule, IonicModule],  // Importa módulos comunes
  exports: [ProductPageComponent]  // Exporta el componente
})
export class ComponentsModule {}
