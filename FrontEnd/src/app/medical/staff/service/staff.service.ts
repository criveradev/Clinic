import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICES } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class StaffService {
  constructor(public HttpClinet: HttpClient, public AuthService: AuthService) {}

  listUsers() {
    let headers = new HttpHeaders({Authorization: 'Bearer' + this.AuthService.token});
    let URL = URL_SERVICES + '/staff';

    return this.HttpClinet.get(URL, { headers: headers });
  }

  listConfig() {
    let headers = new HttpHeaders({Authorization: 'Bearer' + this.AuthService.token});
    let URL = URL_SERVICES + '/staff/config';

    return this.HttpClinet.get(URL, { headers: headers });
  }
}
