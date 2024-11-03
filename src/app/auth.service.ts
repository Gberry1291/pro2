import {inject, Injectable, Signal,signal} from '@angular/core';
import {Auth, GoogleAuthProvider, signInWithPopup, user, User} from '@angular/fire/auth';
import {Router} from "@angular/router";
import {toSignal} from "@angular/core/rxjs-interop";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";

import { getFirestore } from "firebase/firestore";
import { doc, getDoc,collection,setDoc,addDoc } from "firebase/firestore";
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import {query, where, getDocs } from "firebase/firestore";
import { testuser } from './board-data/board.state';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);
  private router: Router = inject(Router)
  public user: Signal<User | undefined> = toSignal(user(this.auth));
  public testuser=signal<testuser>({username:"",theme:"simple",army:"classical"})

  public async loginWithGoogle() {
    await signInWithPopup(this.auth, new GoogleAuthProvider())
        .then(response => {
          if (response.user) {
            this.router.navigate(['/']);
          } else {
            console.error('Login failed')
          }
        })
  }
  public async createuser(email:string,password:string){
    await createUserWithEmailAndPassword(this.auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      this.adduser(email)
      this.router.navigate(['']);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }
  public async normallogin(email:string,password:string){
    signInWithEmailAndPassword(this.auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      this.router.navigate(['']);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }

  public async logout() {
      // await this.auth.signOut().then(() => {
      //     this.router.navigate(['/login']);
      // });
      this.testuser.set({username:"",theme:"simple",army:"classical"})
      this.router.navigate(['/login']);
  }

  public async getusers(){
    const app = initializeApp({"projectId":"pro2-5d1c8","appId":"1:233491030117:web:161573c89bd5a83fdd668c","storageBucket":"pro2-5d1c8.appspot.com","apiKey":"AIzaSyCAdMjkLfrEdyr5M96Oh3TJD-QBdTIYG8Y","authDomain":"pro2-5d1c8.firebaseapp.com","messagingSenderId":"233491030117"})
    const db = getFirestore(app);

    const q = query(collection(db, "users"));

    const querySnapshot = await getDocs(q);
    let listo:any=[]
    querySnapshot.forEach((doc) => {
      listo.push(doc.data()["name"])
    });
    return listo
  }
  public async adduser(newname:string){
    const app = initializeApp({"projectId":"pro2-5d1c8","appId":"1:233491030117:web:161573c89bd5a83fdd668c","storageBucket":"pro2-5d1c8.appspot.com","apiKey":"AIzaSyCAdMjkLfrEdyr5M96Oh3TJD-QBdTIYG8Y","authDomain":"pro2-5d1c8.firebaseapp.com","messagingSenderId":"233491030117"})
    const db = getFirestore(app);

    const docRef = await addDoc(collection(db, "users"), {
      name: newname,
    });
  }

  public testsignin(name:string){
    this.testuser.set({username:name,theme:"park",army:"classical"})
    this.router.navigate(['']);
  }
  public getStyle(){
    return [`../../styles/themes/${this.testuser().theme}.css`,`../../styles/armies/${this.testuser().army}.css`,'../../styles/component-layouts/nav-layout.css']
}

}