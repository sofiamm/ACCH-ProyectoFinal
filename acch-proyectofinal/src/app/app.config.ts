import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(), 
    provideFirebaseApp(() => initializeApp({
      "projectId":"sagc-bd",
      "appId":"1:77678426096:web:24f4a89968a6e7363e4f35",
      "databaseURL":"https://sagc-bd-default-rtdb.firebaseio.com",
      "storageBucket":"sagc-bd.appspot.com",
      "apiKey":"AIzaSyDfMr7qiezy2mZw3uc3znNoQS-QFB6Rie4",
      "authDomain":"sagc-bd.firebaseapp.com",
      "messagingSenderId":"77678426096",
      "measurementId":"G-8LC6S36FT2"
    })), 
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideAnimationsAsync()
  ]
};
