import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { BehaviorSubject } from 'rxjs';
import { routes } from '../routes/routes';
import { URL_SERVICES } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  user: any;
  token: any;
  constructor(private router: Router, public http: HttpClient) {
    this.getLocalStorage();
  }

  //Metodo para obtener los valores del usuario almacenados en el localstorage.
  getLocalStorage() {
    if (localStorage.getItem("token") && localStorage.getItem("user")) {
      let USER = localStorage.getItem("user");
      this.user = JSON.parse(USER ? USER : '');
      this.token = localStorage.getItem("token");
    } else {
      this.user = null;
      this.token = null;
    }
  }

  //Metodo para almacenar la informacion en localstorage.
  saveLocalStorage(auth: any) {
    if (auth && auth.access_token) {
      localStorage.setItem("token", auth.access_token);
      localStorage.setItem("user", JSON.stringify(auth.user));

      return true;
    }
    return false;
  }

  //Metodo de autenticacion.
  login(email: string, password: string) // Debemos pasar como parametro el email y password
  {
    let URL = URL_SERVICES + "/auth/login";
    return this.http.post(URL, { email: email, password: password }).pipe(
      map((auth: any) => {
        console.log(auth);
        const result = this.saveLocalStorage(auth);
        return result;
      }), catchError((error: any) => {
        console.error(error);
        return of(undefined)
      })
    );
  }

  //Metodo para cerrar sesion.
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.router.navigate([routes.login]);
  }
}
