import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth,Auth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import {provideAnimationsAsync } from '@angular/platform-browser/animations/async'

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes,withComponentInputBinding()), 
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()), 
    provideFirebaseApp(() => initializeApp({"projectId":"pro2-5d1c8","appId":"1:233491030117:web:161573c89bd5a83fdd668c","storageBucket":"pro2-5d1c8.appspot.com","apiKey":"AIzaSyCAdMjkLfrEdyr5M96Oh3TJD-QBdTIYG8Y","authDomain":"pro2-5d1c8.firebaseapp.com","messagingSenderId":"233491030117"})),
    provideAuth(() => getAuth()), 
    provideFirebaseApp(() => initializeApp({"projectId":"pro2-5d1c8","appId":"1:233491030117:web:161573c89bd5a83fdd668c","storageBucket":"pro2-5d1c8.appspot.com","apiKey":"AIzaSyCAdMjkLfrEdyr5M96Oh3TJD-QBdTIYG8Y","authDomain":"pro2-5d1c8.firebaseapp.com","messagingSenderId":"233491030117"})), 
    provideFirestore(() => getFirestore()),
  ]
};
