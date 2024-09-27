import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionManager {

    private readonly temporaryUserName: string = 'Nicolas';
    private readonly temporaryPass: string = 'pass';

    // Guarda el estado del login en localStorage
    setSession(isLoggedIn: boolean): void {
        localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
    }

    // Verifica si el usuario está logueado
    isLoggedIn(): boolean {
        const session = localStorage.getItem('isLoggedIn');
        return session ? JSON.parse(session) : false;
    }

    // Lógica para iniciar sesión
    performLogin(user: string, password: string): boolean {
        if (user === this.temporaryUserName && password === this.temporaryPass) {
            this.setSession(true); // Guarda que el usuario está logueado
            return true;
        } else {
            return false;
        }
    }

    obteneruser(){
        const username = this.temporaryUserName
        return username
    }

    // Lógica para cerrar sesión
    performLogout(): void {
        this.setSession(false); // Establece que el usuario no está logueado
    }
}
