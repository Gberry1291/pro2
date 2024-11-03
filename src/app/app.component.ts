import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Board } from './components/board-components/board';
import { Nav } from './components/nav-components/nav';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,Board,Nav],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'pro2';
}
