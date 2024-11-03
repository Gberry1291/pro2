import {Component, inject} from '@angular/core';
import {AuthService} from "../../auth.service";
import { FormControl, ReactiveFormsModule } from '@angular/forms';


@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrl: '../../styles/component-layouts/login.component.scss'
})
export class LoginComponent {
    private authService: AuthService = inject(AuthService);

    email=new FormControl('',{nonNullable: true});
    password=new FormControl('',{nonNullable: true});

    login(){
        // this.authService.normallogin(this.email.value,this.password.value)
        this.authService.testsignin(this.email.value)
    }
    signup(){
        this.authService.testsignin(this.email.value)
        // this.authService.createuser(this.email.value,this.password.value)
    }

    public signInWithGoogle() {
        // this.authService.loginWithGoogle()
        this.authService.testsignin("google")
    }
}