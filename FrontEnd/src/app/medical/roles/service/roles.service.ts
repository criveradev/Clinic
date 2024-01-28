import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICES } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  constructor(public http: HttpClient, public authService: AuthService) {

  }

  indexRoles() {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer' + this.authService.token });
    let URL = URL_SERVICES + '/roles';

    return this.http.get(URL, { headers: headers });
  }

  storeRoles(data: any) {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer' + this.authService.token });
    let URL = URL_SERVICES + '/roles';

    return this.http.post(URL, data, { headers: headers });
  }

  editRoles(data: any, id_role: any) {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer' + this.authService.token });
    let URL = URL_SERVICES + '/roles/' + id_role;

    return this.http.put(URL, data, { headers: headers });
  }

  destroyRoles(id_role: any) {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer' + this.authService.token });
    let URL = URL_SERVICES + '/roles/' + id_role;

    return this.http.delete(URL, { headers: headers });
  }
}
