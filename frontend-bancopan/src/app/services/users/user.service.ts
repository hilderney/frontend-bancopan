import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IUsuario } from 'src/app/interfaces/usuario.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = `${environment.api}/users`;

  constructor(
    private http: HttpClient
  ) { }

  fetchUsers(): Observable<IUsuario[]> {
    return this.http
      .get<IUsuario[]>(this.url)
      .pipe(
        map(
          data => {
            console.log(data);
            localStorage.setItem('userList', JSON.stringify(data));
            return data;
          }
        ));
  }

  private fetchUserData() {
    const userList = localStorage.getItem('userList');
    return !!userList ? JSON.parse(userList) : undefined;
  }

  fetchLastUserId(): number {
    return 0;
  }
}
