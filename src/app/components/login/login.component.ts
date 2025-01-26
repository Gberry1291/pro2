import {Component, inject,Signal,computed} from '@angular/core';
import {AuthService} from "../../auth.service";
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Language } from '../../services/language.service';
import { StyleService } from '../../services/styleingservice';
import {NgClass} from '@angular/common';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ReactiveFormsModule,NgClass],
    templateUrl: './login.component.html',
    styleUrl: '../../styles/component-layouts/login.component.css'
})
export class LoginComponent {
    private authService: AuthService = inject(AuthService);

    email=new FormControl('',{nonNullable: true});
    password=new FormControl('',{nonNullable: true});

    public worddic:Signal<Array<string>>=computed(()=>this.Lang.langdic()["login"])
    public selectedstyle:Signal<string>=computed(()=>this.Style.selectedstyle())

    constructor(private Lang: Language,private Style:StyleService) {
    }

    login(){
        this.authService.normallogin(this.email.value,this.password.value)
    }
    signup(){
        this.authService.createuser(this.email.value,this.password.value)
    }

    public signInWithGoogle() {
        this.authService.loginWithGoogle()
    }
}