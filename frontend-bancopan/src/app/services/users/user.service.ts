import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { IUsuario } from 'src/app/interfaces/usuario.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = `${environment.api}/users`;
  storageNames = {
    listaUsuario: 'userList',
  }

  constructor(
    private http: HttpClient
  ) { }

  fetchUsers(): Observable<IUsuario[]> {
    const userList = this.getUserStorageList()
    if (!!userList) {
      console.log('Lista do Storage');
      return of(userList);
    }

    return this.http
      .get<IUsuario[]>(this.url)
      .pipe(
        map(
          resp => {
            console.log('Lista da Api');
            localStorage.setItem(this.storageNames.listaUsuario, JSON.stringify(resp));
            return resp;
          }
        ));
  }

  addUser(user: IUsuario) {
    const userList = this.getUserStorageList()
    if (!!userList) {
      userList.push(user);
      localStorage.setItem(this.storageNames.listaUsuario, JSON.stringify(userList));
    }
  }

  private getUserStorageList(): IUsuario[] {
    const userListStr: string | null = localStorage.getItem(this.storageNames.listaUsuario);
    const userList: IUsuario[] = !!userListStr ? JSON.parse(userListStr) : null;
    return userList;
  }

  fetchLastUserId(): number {
    return 0;
  }
}
