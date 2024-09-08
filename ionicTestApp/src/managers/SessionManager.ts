import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class SessionManager {

    private readonly temporaryUserName: string = 'user';
    private readonly temporaryPass: string = 'pass';

    performLogin(user: string, password: string): boolean {//Si el usuario y clave pasado por parametro es igual al temporary user y clave retorna true
        if(user == this.temporaryUserName && password == this.temporaryPass) {
            return true;
        } else {
            return false;
        }  
    }

    performLogout() {
        //TODO
    }
}