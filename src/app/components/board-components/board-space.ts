import { Component,Input,input,output,computed,Signal} from '@angular/core';
import { NgClass} from '@angular/common';
import { BoardPeice } from './board-peice';
import { Peice,Location} from '../../board-data/board.state';
import { StyleService } from '../../services/styleingservice';

@Component({
  selector: 'board-space',
  standalone: true,
  imports: [BoardPeice,NgClass],
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

  public selectedstyle:Signal<string>=computed(()=>this.Style.selectedstyle())
  public sendpeice = output<Location>()

  constructor(private Style:StyleService) {}

  public onClick() {
    this.sendpeice.emit({peice:this.square(),index:this.location});
}

  hoverfunc(){
    if (this.square().peice!="" && this.square().player==this.turnplayer) {
      this.color=("legalspace")
    }
  }
  hoverout(){
      this.color=this.origcolor
  }

}
