import { Component,input,Input,computed ,inject} from '@angular/core';
import {KeyValuePipe,NgClass} from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";
import { transition, trigger, useAnimation,style,animate,state } from '@angular/animations';

import {AuthService} from "../../auth.service";


@Component({
  selector: 'nav',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './home.html',
  styleUrl: '../../styles/component-layouts/home-layout.css',
  animations:[
    trigger('showsug', [
      state(        
        'closed',style({height: '0%'}),      
      ),
      state(        
        'open',style({height:'100%'}),    
      ),
      transition('closed <=> open', [animate('1s')]),
    ]
  )]
})
export class Home {
  
  private router: Router = inject(Router)
  public showsug="closed"

  constructor(private http: HttpClient) {

  }
  oppemail=new FormControl('',{nonNullable: true});
  suggestion1=""
  suggestion2=""
  suggestion3=""
  suggestion4=""
  buttonclass="displayoff"

  private authService: AuthService = inject(AuthService);

  userlist:Array<string>|undefined

  public ngOnInit() {
    this.loaduserlist()
}
  
  async loaduserlist(){
    // this.userlist=await this.authService.getusers()
    this.userlist=["kuchtagary1@gmail.com","test@test.com","test2@test.com","test3@test.com"]
  }

  fillsuggestions(){
    this.showsug="open"
    // if (this.oppemail.value.length>3) {
    //   let exactmatch=false
    //   let matches:Array<string>=[]
    //   this.userlist?.forEach(element => {
    //     if (element.match(this.oppemail.value)) {
    //       matches.push(element)
    //     }
    //     if (element==this.oppemail.value) {
    //       exactmatch=true
    //     }
    //   });
    //   if (exactmatch) {
    //     this.buttonclass="displayon"
    //   }else{
    //     this.buttonclass="displayoff"
    //   }
    //   matches.push("","","","")
    //   this.suggestion1=matches[0]
    //   this.suggestion2=matches[1]
    //   this.suggestion3=matches[2]
    //   this.suggestion4=matches[3]
    // }else{
    //   this.buttonclass="displayoff"
    // }
    
      this.suggestion1=this.userlist![0];
      this.suggestion2=this.userlist![1]
      this.suggestion3=this.userlist![2]
      this.suggestion4=this.userlist![3]
  }

  fillinput(sugg:string){
    this.showsug="closed"
    this.oppemail.setValue(sugg)
    this.buttonclass="displayon"
  }

  sendchallenge(){
    this.router.navigate(['board/'+this.oppemail.value]);
  }

}