import { Component,inject,Signal,computed } from '@angular/core';
import {NgIf,NgFor,NgClass} from '@angular/common';
import { BuildBoard } from '../../services/board.service';
import {AuthService} from "../../auth.service";
import { RouterLink } from '@angular/router';
import { Language } from '../../services/language.service';
import { StyleService } from '../../services/styleingservice';

@Component({
  selector: 'opengames',
  standalone: true,
  imports: [NgIf,NgFor,RouterLink,NgClass],
  templateUrl: './opengames.html',
  styleUrl: '../../styles/component-layouts/opengames-layout.css',
})
export class Opengames{

    private authService: AuthService = inject(AuthService);
    public user = this.authService.user

    public games=this.authService.opengames
    opengames:boolean=true;
    wins:boolean=false;
    loses:boolean=false;

    public worddic:Signal<Array<string>>=computed(()=>this.Lang.langdic()["opengames"])
    public selectedstyle:Signal<string>=computed(()=>this.Style.selectedstyle())

  constructor(
    private Lang: Language,
    private Style:StyleService) {
  }

  public async ngOnInit() {
  }
}