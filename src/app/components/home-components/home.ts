import { Component,computed ,inject,signal,Signal} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop'
import {NgClass} from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink,Router } from '@angular/router';
import { transition, trigger,style,animate,state } from '@angular/animations';
import { Language } from '../../services/language.service';
import {AuthService} from "../../auth.service";

@Component({
  selector: 'home',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass,RouterLink],
  templateUrl: './home.html',
  styleUrl: '../../styles/component-layouts/home-layout.css',
  animations:[
    trigger('showsug', [
      state('0',style({height:'0vh'})),
      state('1',style({height:'10vh'})),
      state('2',style({height:'20vh'})),
      state('3',style({height:'30vh'})),
      state('4',style({height:'40vh'})),
      transition('* <=> *', [animate('.4s')]),
    ]),
    trigger('growhand', [
      state('true',style({height:'100%',width:'100%',rotate:"45deg",opacity:1})),
      state('false',style({height:'50%',width:'50%',rotate:"0deg",opacity:0})),
      transition('* <=> *', [animate('1s')]),
    ]),
    trigger('makeangry', [
      state('true',style({opacity:1})),
      state('false',style({opacity:0})),
      transition('* <=> *', [animate('1s')]),
    ]),
    trigger('gloweyes', [
      state('true',style({background:"rgb(140, 26, 26)"})),
      state('false',style({background:"rgb(255, 255, 162)"})),
      transition('* <=> *', [animate('1s')]),
    ])
  ]
})
export class Home {

  private authService: AuthService = inject(AuthService);
  public user = this.authService.user
  
  private router: Router = inject(Router)
  public worddic:Signal<Array<string>>=computed(()=>this.Lang.langdic()["home"])
  public selectedstyle:Signal<string>=computed(()=>this.Auth.userinfo().theme)
  public userlist=computed(()=>this.authService.userlist().map((i)=>[i.name,i.uid]))
  public onlynames=computed(()=>this.userlist().map((i)=>i[0]))
  public buttonclass=computed<string>(() =>this.onlynames().includes(this.firstName()!)?"displayon":"displayoff")


  constructor(
    private Lang: Language,
    private Auth:AuthService,
  ) {

  }

  movehand=false
  makeangry=false
  oppemail=new FormControl('',{nonNullable: true});
  oppuid:string=""
  suggestion1=signal<Array<string>>([])
  suggestion2=signal<Array<string>>([])
  suggestion3=signal<Array<string>>([])
  suggestion4=signal<Array<string>>([])

  slidestatus=computed<string>(()=>{
    let status=0
    if (this.suggestion1()[0]) {status+=1}
    if (this.suggestion2()[0]) {status+=1}
    if (this.suggestion3()[0]) {status+=1}
    if (this.suggestion4()[0]) {status+=1}
    return status.toString()
  })
  firstName = toSignal<string>(this.oppemail.valueChanges);

  fillsuggestions(){
    
    if (this.oppemail.value) {
      let matches:Array<Array<string>>=[]
      this.userlist().forEach(element => {
        if (element[0].match(this.oppemail.value) && element[0]!=this.user()?.email) {
          matches.push(element)
        }
        if (element[0]==this.oppemail.value) {
          matches.unshift(element)
        }
      });
      matches.push([],[],[],[])
      this.suggestion1.set(matches[0])
      this.suggestion2.set(matches[1])
      this.suggestion3.set(matches[2])
      this.suggestion4.set(matches[3])
    }else{
      this.resetsugg()
    }

    
  }

  async resetsugg(){
    this.suggestion1.set(["",""])
    this.suggestion2.set(["",""])
    this.suggestion3.set(["",""])
    this.suggestion4.set(["",""])
  }

  fillinput(sugg:Array<string>){
    this.oppemail.setValue(sugg[0])
    this.oppuid=sugg[1]
    this.resetsugg()
  }

  sendchallenge(){
    this.router.navigate(['/board', { email: this.oppemail.value,uid:this.oppuid }]);
  }

  chill(){
    this.movehand=false
    this.makeangry=false
  }
  mad(){
    this.movehand=true
    this.makeangry=true
  }

}