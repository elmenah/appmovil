import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { defineCustomElements } from "@teamhive/lottie-player/loader";
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AngularFireModule} from '@angular/fire/compat'
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule} from '@angular/fire/compat/auth';

defineCustomElements(window);

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,AngularFireModule.initializeApp(environment.firebaseConfig),AngularFireAuthModule, IonicModule.forRoot({mode:"md"}), AppRoutingModule, IonicStorageModule.forRoot()],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
  
})
export class AppModule {

  
}
