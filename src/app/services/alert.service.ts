import { Injectable, signal } from '@angular/core';

@Injectable({providedIn: 'root'})
export class AlertService {

    public display = signal<string>("off")
    public maintext = signal<string>("")
    public subtext = signal<string>("")
    public spin= signal<boolean>(false)
    public clickoff=signal<boolean>(false)

    constructor() {}

    public alert(show:string,text1:string,text2:string,loading:boolean){
        this.display.set(show)
        this.maintext.set(text1)
        this.subtext.set(text2)
        this.spin.set(loading)
    }

    public async load(){
        this.display.set("off")
        this.maintext.set("no text")
        this.subtext.set("no text")
        this.spin.set(false)
    }

    public clickable(){
        this.clickoff.set(true)
    }

    public end(){
        if (this.clickoff()) {
            this.display.set("off")
            this.spin.set(false)
            this.clickoff.set(false)
        }
    }

    public endspin(){
        this.spin.set(false)
    }

}