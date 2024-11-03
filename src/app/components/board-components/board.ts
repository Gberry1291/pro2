import { Component,Input,Output,signal,WritableSignal,ChangeDetectionStrategy,ViewEncapsulation } from '@angular/core';
import { BoardSpace } from './board-space';
import { BoardPeice } from './board-peice';
import { Promotion } from './promotion';
import { Buttons } from './buttons';
import { Log } from './log'
import { NgFor,NgIf,KeyValuePipe,NgClass } from '@angular/common';
import { Peice,BoardLayout,Location,databank,movementLog,legalmoves } from '../../board-data/board.state';
import { BuildBoard } from '../../services/board.service';
import { FindLegal } from '../../services/movement.service';
import {AuthService} from "../../auth.service";

@Component({
  selector: 'board',
  standalone: true,
  imports: [
    NgFor,NgIf,NgClass,Log,BoardSpace,KeyValuePipe,
    BoardPeice,Promotion,Buttons],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './board.html',
  styleUrls: ['../../styles/component-layouts/board-layout.css'],
  encapsulation: ViewEncapsulation.None,
})
export class Board {
  @Output()
  public selected = signal<Boolean>(false);
  public selectedplayer:string
  public notplayer:string
  public yourturn:boolean
  public incheck:boolean
  public holder=signal<Peice>({"peice":"C","player":"player1","x":1,"y":1,"legal":false,"space":"blackspace","top":"0%","left":"0%","animate":"start"})
  public undo:boolean=false
  public returntostart:boolean=false
  public save:boolean=false
  public tempmovelist:Array<movementLog>=[]
  public legals:legalmoves={
    legalmoves:[],
    special:false,
    peice:null,
    changelist:[["",0,"","",""]],
    special2:false,
    peice2:null,
    changelist2:[["",0,"","",""]]
  }
  public promotion="notvisible"   
  public opponent:string|undefined
  public showlog:boolean=false
 @Input()
 set email(email: string) { 
   this.opponent = email;
  }

  // private authService: AuthService = inject(AuthService);
  // public user = this.authService.user
  public user=signal({email:"kuchtagary1@gmail.com"})

  constructor(private boardservice: BuildBoard,private moveservice:FindLegal) {
    this.yourturn=this.boardservice.board().turnplayer==this.user()?.email?true:false
    this.selectedplayer=this.boardservice.board().turnplayer==this.boardservice.board().player1?"player2":"player1"
    this.notplayer=this.boardservice.board().turnplayer==this.boardservice.board().player1?"player1":"player2"
    this.incheck=this.boardservice.board().incheck
  }
  public get spaces2(): WritableSignal<databank>{
    return this.boardservice.board
  }

  public ngOnInit() {
      // this.boardservice.load2(this.user()?.email,this.opponent)
      this.boardservice.load2("kuchtagary1@gmail.com","test@test.com")
  }

  public changeturn(){
    if (this.selectedplayer=="player1") {
      this.selectedplayer="player2"
      this.notplayer="player1"
    }else{
      this.selectedplayer="player1"
      this.notplayer="player2"
    }
    // this.moveservice.AllOpponentMoves(this.selectedplayer,this.notplayer)
  }

  selectpeice(local:Location){

    if (this.selected()) {
      if (this.holder()!=local.peice && local.peice.legal) {
        this.makemove(local)
      }else{
        this.holder().player=this.selectedplayer
        this.selected.set(false)
      }
      this.resetlegal()
    }else{
      this.showlegalMoves(local)
    }
  }

  async makemove(local:Location){
    if ((this.legals.peice==local.peice && this.legals.special==true)) {
      this.addToLog(this.holder(),local.peice,this.legals.special,this.legals.changelist)
      this.legals.changelist.forEach(element => {
        this.boardservice.board().board[element[1] as keyof BoardLayout].peice=element[0]
        this.boardservice.board().board[element[1] as keyof BoardLayout].player=element[2]
      });
    }else if(this.legals.peice2==local.peice && this.legals.special2==true){
      this.addToLog(this.holder(),local.peice,this.legals.special2,this.legals.changelist2)
      this.legals.changelist2.forEach(element => {
        this.boardservice.board().board[element[1] as keyof BoardLayout].peice=element[0]
        this.boardservice.board().board[element[1] as keyof BoardLayout].player=element[2]
      });
    }else{
      this.addToLog(this.holder(),local.peice,false,[])
      this.doanimation(local)
      await new Promise(res => setTimeout(res, 1000))
      this.holder().top="0%"
      this.holder().left="0%"
      this.holder().animate="start"
      local.peice.peice=this.holder().peice
      local.peice.player=this.selectedplayer
      this.holder().peice=""
      this.holder().player="player0"
    }
    this.incheck=false
    // looks to see if the peice you moved puts opponent in check
    let thispeice:Array<number>=this.moveservice.moveManager(local,this.selectedplayer,this.notplayer).legalmoves
    let incheck=this.moveservice.lookForCheck(thispeice,this.notplayer)
    if (incheck) {
      this.incheck=true
      this.moveservice.AllOpponentMoves(this.notplayer,this.selectedplayer)
      if (!this.moveservice.GameOverCheck(this.notplayer,this.selectedplayer)) {
        console.log("game over sun")
      }
      
    }
    if (local.peice.peice=="P"&&(local.peice.y==1||local.peice.y==8)) {
      this.promotion="visible";
      this.holder.set(local.peice)
    }
    // looks at your peices for a revealed check
    let revealcheck=this.moveservice.lookForRevealCheck(this.selectedplayer,this.notplayer)
    if (revealcheck) {
      this.incheck=true
    }

    this.boardservice.board.set({...this.boardservice.board()});
    this.selected.set(false);
    this.changeturn()
  }

  async doanimation(local:Location){
    let movex=(this.holder().x-local.peice.x)*100
    let movey=(this.holder().y-local.peice.y)*100
    if (this.holder().x>local.peice.x) {
      movex=Math.abs(movex)*-1
    }else{
      movex=Math.abs(movex)
    }
    if (this.holder().y>local.peice.y) {
      movey=Math.abs(movey)*-1
    }else{
      movey=Math.abs(movey)
    }
    this.holder().top=movey.toString()+"%"
    this.holder().left=movex.toString()+"%"
    this.holder().animate="up"
  }
  

  showlegalMoves(local:Location){
    if (local.peice.peice!=""&&local.peice.player==this.selectedplayer) {
      local.peice.player="selected"
      this.holder.set(local.peice)
      this.selected.set(true);
      this.moveservice.AllOpponentMoves(this.selectedplayer,this.notplayer)
      this.moveservice.pinnedPeices(this.selectedplayer,this.notplayer)
      if (this.incheck) {
        this.legals=this.moveservice.moveManager(local,this.selectedplayer,this.notplayer,false,true)
      }else{
        this.legals=this.moveservice.moveManager(local,this.selectedplayer,this.notplayer)
      }
      
      this.legals.legalmoves.forEach(element => {
        this.boardservice.board().board[element as keyof BoardLayout].legal=true
        this.boardservice.board().board[element as keyof BoardLayout].space="legalspace"
      });
    }
  }

  resetlegal(){
    this.legals.legalmoves.forEach(element => {
      this.boardservice.board().board[element as keyof BoardLayout].space="blackspace"
      this.boardservice.board().board[element as keyof BoardLayout].legal=false
      if (this.boardservice.board().board[element as keyof BoardLayout].y%2) {
        if (this.boardservice.board().board[element as keyof BoardLayout].x%2!=1) {
          this.boardservice.board().board[element as keyof BoardLayout].space="whitespace"
        }
      }else{
        if (this.boardservice.board().board[element as keyof BoardLayout].x%2) {
          this.boardservice.board().board[element as keyof BoardLayout].space="whitespace"
        }
      }
    });
  }
  addToLog(start:Peice,end:Peice,special:boolean,speciallog:Array<[string,number,string,string,string]>){
    let newstart=Number(start.y.toString()+start.x.toString())
    let newend=Number(end.y.toString()+end.x.toString())
    let newlog:movementLog={
      start:newstart,
      end:newend,
      startpeice:start.peice,
      endpeice:end.peice,
      startplayer:this.selectedplayer,
      endplayer:end.player,
      incheck:this.incheck,
      special:special,
      changelist:speciallog,
    }
    this.boardservice.board().log.splice(0,0,newlog)
    this.tempmovelist?.splice(0,0,newlog)
    this.showbuttons()
  }
  undolast(){
      let newestmove=this.boardservice.board().log.shift()
      this.tempmovelist.shift()
      if (newestmove?.special) {
        newestmove?.changelist.forEach(element => {
          this.boardservice.board().board[element[1] as keyof BoardLayout].peice=element[3]
          this.boardservice.board().board[element[1] as keyof BoardLayout].player=element[4]
        });
      }else{
        let editpeice1=this.boardservice.board().board[newestmove?.start as keyof BoardLayout]
        editpeice1.peice=newestmove?.startpeice!
        editpeice1.player=newestmove?.startplayer!
        let editpeice2=this.boardservice.board().board[newestmove?.end as keyof BoardLayout]
        editpeice2.peice=newestmove?.endpeice!
        editpeice2.player=newestmove?.endplayer!
      }
      this.incheck=newestmove!.incheck
      this.changeturn()
      this.showbuttons()
  }
  showbuttons(){
    if (this.tempmovelist?.length==1) {
      this.undo=true
      this.save=true
      this.returntostart=false
    }else{this.save=false}
    if (this.tempmovelist?.length>1) {
      this.returntostart=true
    }
    if (this.tempmovelist?.length<1) {
      this.undo=false;
    }
    
  }
  undoTofirst(){
    while (this.tempmovelist.length>1) {
      this.undolast()
    }
  }

  promotionFunc(promote:string){
    this.promotion="notvisible"
    this.holder().peice=promote
    this.boardservice.board.set({...this.boardservice.board()});
  }
  toglog(){
    this.showlog=!this.showlog
  }
  buttonclick(event:string){
    if (event=="toglog") {
      this.toglog()
    }
    if (event=="undolast") {
      this.undolast()
    }
    if (event=="undoTofirst") {
      this.undoTofirst()
    }
  }



}