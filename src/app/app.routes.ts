import { Routes } from '@angular/router';
import { Home } from './components/home-components/home';
import { Board } from './components/board-components/board';
import { AI } from './components/board-components/AI';
import { Settings } from './components/settings-components/settings.component';
import { Opengames } from './components/opengames-components/opengames';
import { Ranking } from './components/rank-components/rank'
import {LoginComponent} from "./components/login/login.component";
import {AuthGuard} from "./auth.guard";

export const routes: Routes = [
    // { path: '', component: Home, canActivate: [AuthGuard]},
    { path: '', component: Home},
    { path: "login", component: LoginComponent },
    { path: "AI", component: AI },
    // { path: 'board/:email', component: Board,canActivate: [AuthGuard] },
    { path: 'board', component: Board,canActivate: [AuthGuard]},
    { path: 'settings', component: Settings},
    { path: 'opengames', component: Opengames},
    { path: 'rank', component: Ranking,canActivate: [AuthGuard]},
];
