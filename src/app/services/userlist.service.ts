import { HttpClient } from '@angular/common/http';
import { Injectable, signal,inject } from '@angular/core';
import { Observable } from 'rxjs';
import {AuthService} from "../auth.service";

@Injectable({providedIn: 'root'})
export class BuildUserList {
    private authService: AuthService = inject(AuthService);

    constructor(private http: HttpClient) {

    }

    public playerlist = signal<Array<string>>([]);

    public async load(){
        if (this.playerlist().length==0) {
            let found=await this.authService.getusers()
            this.playerlist.set(found)
        }
        return this.playerlist()
    }


}