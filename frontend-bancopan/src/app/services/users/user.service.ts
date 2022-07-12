import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, take } from 'rxjs';
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

    return this.http.get<IUsuario[]>(this.url)
      .pipe(
        map(
          response => {
            console.log('Lista da Api');
            const lista = response.map((usuario, index) => {
              usuario.id = index + 1
              return usuario;
            })
            localStorage.setItem(this.storageNames.listaUsuario, JSON.stringify(response));
            return response;
          }
        ));
  }

  fetchUserById(idUsuario: number): Observable<IUsuario | undefined> {
    const userList = this.getUserStorageList()
    console.log('Lista do Storage');
    userList.map((user: IUsuario, index: number) => user.id == index);
    return of(userList.find((usuario: IUsuario) => usuario.id === idUsuario));
  }

  addUser(user: IUsuario): number {
    const userList = this.getUserStorageList()
    if (!userList) return 0;
    user.cpf = user.cpf.replace(/\D/g, '');
    user.phone = user.phone.replace(/\D/g, '');
    user.id = this.getUsersLastId(userList);
    userList.push(user);
    localStorage.setItem(this.storageNames.listaUsuario, JSON.stringify(userList));
    return <number>user.id;
  }

  updateUser(user: IUsuario): number {
    const userList = this.getUserStorageList();
    if (!userList) return 0;
    const found = userList.find((usuario: IUsuario) => usuario.id === user.id);
    if (!found)
      return 0;

    found.name = user.name;
    found.cpf = user.cpf.replace(/\D/g, '');
    found.email = user.email;
    found.phone = user.phone.replace(/\D/g, '');
    localStorage.setItem(this.storageNames.listaUsuario, JSON.stringify(userList));
    return <number>found.id;
  }

  removeUser(idUsuario: number): number {
    const userList = this.getUserStorageList()
    if (!userList) return 0;
    userList.splice(
      userList.findIndex((usuario: IUsuario) => usuario.id === idUsuario), 1);
    localStorage.setItem(this.storageNames.listaUsuario, JSON.stringify(userList));
    return this.getUsersLastId(userList);
  }

  private getUsersLastId(userList: IUsuario[]): number {
    if (userList) {
      return Math.max(...userList.map(user => <number>user.id))
    }
    return 0;
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
