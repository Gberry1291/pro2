// import { TestBed } from '@angular/core/testing';
// import { AppComponent } from './app.component';

// import { AngularFireModule } from '@angular/fire/compat';
// import { AngularFireAuthModule } from '@angular/fire/compat/auth';
// import { AuthService } from './auth.service';

// describe('AppComponent', () => {
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [AppComponent],
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         AngularFireModule.initializeApp({"projectId":"pro2-5d1c8","appId":"1:233491030117:web:161573c89bd5a83fdd668c","storageBucket":"pro2-5d1c8.appspot.com","apiKey":"AIzaSyCAdMjkLfrEdyr5M96Oh3TJD-QBdTIYG8Y","authDomain":"pro2-5d1c8.firebaseapp.com","messagingSenderId":"233491030117"}),
//         AngularFireAuthModule,
//       ],
//       providers: [AuthService],
  
//     });
  
//   });
  

//   it('should create the app', () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.componentInstance;
//     expect(app).toBeTruthy();
//   });

//   it(`should have the 'pro2' title`, () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.componentInstance;
//     expect(app.title).toEqual('pro2');
//   });

//   it('should render title', () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     fixture.detectChanges();
//     const compiled = fixture.nativeElement as HTMLElement;
//     expect(compiled.querySelector('h1')?.textContent).toContain('Hello, pro2');
//   });
// });
