import { Component,output,input,Input,computed,ChangeDetectionStrategy} from '@angular/core';
import {KeyValuePipe,NgClass} from '@angular/common';


@Component({
  selector: 'promotion-select',
  standalone: true,
  imports: [KeyValuePipe,NgClass],
  templateUrl: './promotion.html',
})
export class Promotion {
  @Input()
  public visible:string|undefined
  public sendpeice = output<string>()
  
  constructor() {}

  clickpeice(peice:string){
    this.sendpeice.emit(peice);
  }

}