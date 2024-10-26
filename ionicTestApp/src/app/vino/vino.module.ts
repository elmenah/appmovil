import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VinoPageRoutingModule } from './vino-routing.module';

import { VinoPage } from './vino.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VinoPageRoutingModule
  ],
  declarations: [VinoPage]
})
export class VinoPageModule {}
