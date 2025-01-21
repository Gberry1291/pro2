import { Component,input,Signal,computed} from '@angular/core';
import {KeyValuePipe,NgClass} from '@angular/common';
import { Peice } from '../../board-data/board.state';
import { transition, trigger, useAnimation,style,animate,state } from '@angular/animations';
import { StyleService } from '../../services/styleingservice';

@Component({
  selector: 'board-peice',
  standalone: true,
  imports: [NgClass],
  templateUrl: './board-peice.html',
  animations:[
    trigger('moveup', [
      state(        
        'start',style({top: '0%'}),      
      ),
      state(        
        'up',style({top:'{{wherex}}',left:'{{wherey}}'}),{params:{ wherex: "-100%",wherey: "-100%"}}    
      ),
      transition('* => up', [animate('1s')]),
    ]
  )]
})
export class BoardPeice {
  public square = input.required<Peice>();
  public selectedstyle:Signal<string>=computed(()=>this.Style.selectedstyle())
  public selectedarmy:Signal<string>=computed(()=>this.Style.selectedarmy())

  constructor(private Style:StyleService) {

  }

}