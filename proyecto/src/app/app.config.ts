import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), provideAnimationsAsync(), provideAnimationsAsync(), importProvidersFrom(provideFirebaseApp(() => initializeApp({ "projectId": "sagc-bd", "appId": "1:77678426096:web:24f4a89968a6e7363e4f35", "databaseURL": "https://sagc-bd-default-rtdb.firebaseio.com", "storageBucket": "sagc-bd.appspot.com", "apiKey": "AIzaSyDfMr7qiezy2mZw3uc3znNoQS-QFB6Rie4", "authDomain": "sagc-bd.firebaseapp.com", "messagingSenderId": "77678426096", "measurementId": "G-8LC6S36FT2" }))), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirestore(() => getFirestore())), importProvidersFrom(provideDatabase(() => getDatabase())), importProvidersFrom(provideStorage(() => getStorage()))]
};
