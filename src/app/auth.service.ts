import { Injectable, Signal,signal } from '@angular/core';
import {Auth, GoogleAuthProvider, signInWithPopup, user, User,onAuthStateChanged} from '@angular/fire/auth';
import {Router} from "@angular/router";
import {toSignal} from "@angular/core/rxjs-interop";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";

import { getFirestore } from "firebase/firestore";
import { doc,getDoc,collection,setDoc,query,getDocs,increment,updateDoc } from "firebase/firestore";
import { initializeApp } from '@angular/fire/app';
import { databank, testuser,opengame,endgame } from './board-data/board.state';
import { testboarddata } from './services/save.service';
import { Language } from './services/language.service';
import { StyleService } from './services/styleingservice';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userinfo=signal<testuser>({name:"guest",theme:"simple",army:"classical",points:0,language:"eng",uid:""})
  public opengames=signal<Array<opengame>>([])
  public userlist=signal<Array<testuser>>([])

  newbie;
  user:Signal<User|undefined>;

    constructor(
      private lang: Language,
      private style:StyleService,
      private router:Router,
      private auth:Auth
    ) {
        this.newbie=onAuthStateChanged(this.auth, (user) => {
          if (user) {
            const uid = user.uid;
            const nameo = user.email
            this.setuserdata(uid,nameo!)
            this.pullopengames(nameo!)
            this.getusersrank()
            this.lang.changelanguage(this.userinfo().language)
            this.style.changetheme(this.userinfo().theme,this.userinfo().army)
          } else {
          }
        
        });
        this.user=toSignal(user(this.auth))
    }


  public async loginWithGoogle() {
    await signInWithPopup(this.auth!, new GoogleAuthProvider())
        .then(response => {
          if (response.user) {
            this.router!.navigate(['/']);
          } else {
            console.error('Login failed')
          }
        })
  }
  public async createuser(email:string,password:string){
    await createUserWithEmailAndPassword(this.auth!, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      this.router!.navigate(['']);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }
  public async normallogin(email:string,password:string){
    signInWithEmailAndPassword(this.auth!, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      this.router!.navigate(['']);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }
  public async logout() {
      await this.auth!.signOut().then(() => {
          this.router!.navigate(['/login']);
      });
  }


  public async getusersrank(){
    const app = initializeApp({"projectId":"pro2-5d1c8","appId":"1:233491030117:web:161573c89bd5a83fdd668c","storageBucket":"pro2-5d1c8.appspot.com","apiKey":"AIzaSyCAdMjkLfrEdyr5M96Oh3TJD-QBdTIYG8Y","authDomain":"pro2-5d1c8.firebaseapp.com","messagingSenderId":"233491030117"})
    const db = getFirestore(app);

    const q = query(collection(db, "users"));

    const querySnapshot = await getDocs(q);
    let listo:Array<testuser>=[]
    querySnapshot.forEach((doc) => {
      listo.push({
        "name":doc.data()["name"],
        "theme":doc.data()["theme"],
        "army":doc.data()["army"],
        "points":doc.data()["points"],
        "language":doc.data()["language"],
        "uid":doc.data()["uid"]
      })
    });
    this.userlist.set(listo)
  }
  public async getboard(player1:string,player2:string){
    const app = initializeApp({"projectId":"pro2-5d1c8","appId":"1:233491030117:web:161573c89bd5a83fdd668c","storageBucket":"pro2-5d1c8.appspot.com","apiKey":"AIzaSyCAdMjkLfrEdyr5M96Oh3TJD-QBdTIYG8Y","authDomain":"pro2-5d1c8.firebaseapp.com","messagingSenderId":"233491030117"})
    const db = getFirestore(app);

    const q = query(collection(db, "opengames"));

    const querySnapshot = await getDocs(q);
    let listo
    let found=false
    querySnapshot.forEach((doc) => {
      if ((doc.data()["player1"]==player1||doc.data()["player2"]==player1) && (doc.data()["player1"]==player2||doc.data()["player2"]==player2) && (!doc.data()["over"])) {
        found=true
        listo=doc.data()
    }
    });
    if (!found) {
      listo=testboarddata[0]
    }
    return listo
  }
  public async pullopengames(username:string){
    const app = initializeApp({"projectId":"pro2-5d1c8","appId":"1:233491030117:web:161573c89bd5a83fdd668c","storageBucket":"pro2-5d1c8.appspot.com","apiKey":"AIzaSyCAdMjkLfrEdyr5M96Oh3TJD-QBdTIYG8Y","authDomain":"pro2-5d1c8.firebaseapp.com","messagingSenderId":"233491030117"})
    const db = getFirestore(app);
    const q = query(collection(db, "opengames"));

    let gamelist:any=[]

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if ((doc.data()["player1"]==username||doc.data()["player2"]==username)) {
        
        let builtarray={
          opp:doc.data()["player1"],
          yourturn:false,
          oppuid:doc.data()["p1uid"],
          over:doc.data()["over"],
          winner:doc.data()["winner"]
        }
        if (doc.data()["player1"]==username) {
            builtarray.opp=doc.data()["player2"]
            builtarray.oppuid=doc.data()["p2uid"]
        }
        if (doc.data()["turnplayer"]==username) {
            builtarray.yourturn=true
        }
        gamelist.push(builtarray)

      }
    })

    this.opengames.set(gamelist)

  }


  public async saveboard(datainput:databank){
    const app = initializeApp({"projectId":"pro2-5d1c8","appId":"1:233491030117:web:161573c89bd5a83fdd668c","storageBucket":"pro2-5d1c8.appspot.com","apiKey":"AIzaSyCAdMjkLfrEdyr5M96Oh3TJD-QBdTIYG8Y","authDomain":"pro2-5d1c8.firebaseapp.com","messagingSenderId":"233491030117"})
    const db = getFirestore(app);
    // const docRef = await addDoc(collection(db, "opengames"), {
    //   board:datainput.board,
    //   id:datainput.id,
    //   incheck:datainput.incheck,
    //   log:datainput.log,
    //   player1:datainput.player1,
    //   player2:datainput.player2,
    //   turnplayer:datainput.turnplayer,
    // });
    await setDoc(doc(db, "opengames", datainput.id),datainput);
  }
  public async setuserdata(uid:string,name:string){
    const app = initializeApp({"projectId":"pro2-5d1c8","appId":"1:233491030117:web:161573c89bd5a83fdd668c","storageBucket":"pro2-5d1c8.appspot.com","apiKey":"AIzaSyCAdMjkLfrEdyr5M96Oh3TJD-QBdTIYG8Y","authDomain":"pro2-5d1c8.firebaseapp.com","messagingSenderId":"233491030117"})
    const db = getFirestore(app);
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      this.userinfo.set({
        name:docSnap.data()!["name"],
        theme:docSnap.data()!["theme"],
        army:docSnap.data()!["army"],
        points:docSnap.data()!["points"],
        language:docSnap.data()!["language"],
        uid:docSnap.data()!["uid"]
        
      })
    } else {
      this.userinfo.set({
        name:name,
        theme:"simple",
        army:"classical",
        points:0,
        language:"eng",
        uid:uid
      })
      // await addDoc(collection(db, "users",uid),this.userinfo());
      await setDoc(doc(db, "users", this.user()!.uid),this.userinfo());
    }
  }
  public async savelanguage(newlanguage:string){
    this.userinfo().language=newlanguage
    this.userinfo.set({...this.userinfo()})
    if (this.user()) {
      this.saveuserinfo()
    }
    this.lang.changelanguage(this.userinfo().language)
  }
  public async savestyles(theme:string,army:string){
    this.userinfo().theme=theme
    this.userinfo().army=army
    this.userinfo.set({...this.userinfo()})
    if (this.user()) {
      this.saveuserinfo()
    }
    this.style.changetheme(this.userinfo().theme,this.userinfo().army)
  }
  public async saveendgame(data:endgame){
    const app = initializeApp({"projectId":"pro2-5d1c8","appId":"1:233491030117:web:161573c89bd5a83fdd668c","storageBucket":"pro2-5d1c8.appspot.com","apiKey":"AIzaSyCAdMjkLfrEdyr5M96Oh3TJD-QBdTIYG8Y","authDomain":"pro2-5d1c8.firebaseapp.com","messagingSenderId":"233491030117"})
    const db = getFirestore(app);
    await updateDoc(doc(db, "users", this.user()!.uid), {
      points: increment(data.points1)
    });
    await updateDoc(doc(db, "users", data.loser), {
      points: increment(data.points2)
    });
  }
  public async saveuserinfo(){
    const app = initializeApp({"projectId":"pro2-5d1c8","appId":"1:233491030117:web:161573c89bd5a83fdd668c","storageBucket":"pro2-5d1c8.appspot.com","apiKey":"AIzaSyCAdMjkLfrEdyr5M96Oh3TJD-QBdTIYG8Y","authDomain":"pro2-5d1c8.firebaseapp.com","messagingSenderId":"233491030117"})
    const db = getFirestore(app);
    await setDoc(doc(db, "users", this.user()!.uid),this.userinfo());
  }

}