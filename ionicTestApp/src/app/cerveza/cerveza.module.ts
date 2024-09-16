import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CervezaPageRoutingModule } from './cerveza-routing.module';

import { CervezaPage } from './cerveza.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CervezaPageRoutingModule
  ],
  declarations: [CervezaPage]
})
export class CervezaPageModule {}
