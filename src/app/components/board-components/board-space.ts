import { Component,Input,input,output,Output,computed,ChangeDetectionStrategy,signal} from '@angular/core';
import { Board } from './board';
import {KeyValuePipe,NgClass} from '@angular/common';
import { BoardPeice } from './board-peice';
import { Peice,Location} from '../../board-data/board.state';

@Component({
  selector: 'board-space',
  standalone: true,
  imports: [Board,BoardPeice,NgClass],
  templateUrl: './board-space.html',
})

export class BoardSpace {
  public square = input.required<Peice>();
  @Input()
  color:string|undefined;
  @Input()
  origcolor:string|undefined
  @Input()
  location:string|any
  @Input()
  turnplayer:string|undefined


  public sendpeice = output<Location>()

  constructor() {}

  public onClick() {
    this.sendpeice.emit({peice:this.square(),index:this.location});
}

  hoverfunc(){
    if (this.square().peice!="" && this.square().player==this.turnplayer) {
      this.color="legalspace"
    }
  }
  hoverout(){
    if (this.square().peice!="") {
      this.color=this.origcolor
    }
  }

}
