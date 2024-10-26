import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WhiskyPageRoutingModule } from './whisky-routing.module';

import { WhiskyPage } from './whisky.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WhiskyPageRoutingModule
  ],
  declarations: [WhiskyPage]
})
export class WhiskyPageModule {}
