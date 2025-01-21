import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav } from './components/nav-components/nav';
import { Alert } from './components/alertcustom-components/alert';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,Nav,Alert],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'pro2';


  constructor() {
  }

}
