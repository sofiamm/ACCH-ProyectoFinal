import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { environment } from '../environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

import { AngularFireModule } from '@angular/fire/compat';
import { StorageModule } from '@angular/fire/storage';
import { AppComponent } from './app.component';
import { PasarelaPagosComponent } from './components/pasarela-pagos/pasarela-pagos.component';
import { HeaderComponent } from './components/header/header.component';


@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    StorageModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideAuth(() => getAuth())
  ],
  bootstrap: [AppModule]
})
export class AppModule { }
