import { Routes } from '@angular/router';
import { Home } from './components/home-components/home';
import { Board } from './components/board-components/board';
import {LoginComponent} from "./components/login/login.component";
import {AuthGuard} from "./auth.guard";

export const routes: Routes = [
    { path: '', component: Home, canActivate: [AuthGuard]},
    // { path: '', component: Home},
    { path: "login", component: LoginComponent },
    // { path: 'board/:email', component: Board,canActivate: [AuthGuard] },
    { path: 'board/:email', component: Board},
];
