import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, take } from 'rxjs';
import { IUsuario } from 'src/app/interfaces/usuario.interface';
import { usuarioModel } from 'src/app/models/usuario.model';
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
    if (!!userList) return of(userList);

    return this.http.get<IUsuario[]>(this.url)
      .pipe(
        map(
          (response: IUsuario[]) => {
            const lista = response.map((usuario, index) => {
              usuario.id = index + 1
              return usuario;
            });
            this.overwriteLocalStorage(this.storageNames.listaUsuario, response);
            return response;
          }
        ));
  }

  fetchUserById(idUsuario: number): Observable<IUsuario | undefined> {
    const userList = this.getUserStorageList();

    userList.map((user: IUsuario, index: number) => user.id == index);
    return of(userList.find((usuario: IUsuario) => usuario.id === idUsuario));
  }

  addUser(user: IUsuario): number {
    const userList = this.getUserStorageList()
    if (!userList) return 0;
    user = this.overwritetUserData(user);
    user.id = this.getUsersLastId(userList) + 1;
    userList.push(user);
    this.overwriteLocalStorage(this.storageNames.listaUsuario, userList);
    return user.id;
  }

  updateUser(user: IUsuario): number {
    const userList = this.getUserStorageList();
    if (!userList) return 0;

    let found = userList.find((usuario: IUsuario) => usuario.id === user.id);
    if (!found) return 0;
    found.name = user.name;
    found.cpf = user.cpf.replace(/\D/g, '');
    found.email = user.email;
    found.phone = user.phone.replace(/\D/g, '');
    this.overwriteLocalStorage(this.storageNames.listaUsuario, userList);
    return found.id;
  }

  removeUser(idUsuario: number): number {
    const userList = this.getUserStorageList();
    if (!userList) return 0;

    userList
      .splice(userList
        .findIndex((usuario: IUsuario) => usuario.id === idUsuario)
        , 1
      );
    this.overwriteLocalStorage(this.storageNames.listaUsuario, userList);

    return this.getUsersLastId(userList);
  }

  addCpfFormat(cpf: string) {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.trim().length !== 11)
      return cpf;
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

  addPhoneFormat(phone: string) {
    phone = phone.replace(/\-/g, '');
    if (phone.trim().length < 10 || phone.trim().length > 13)
      return phone;

    let phoneMasked: string = phone;

    if (phone.length === 10) {
      phoneMasked = phone.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    } else if (phone.length === 11) {
      phoneMasked = phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    } else if (phone.length === 12) {
      phoneMasked = phone.replace(/(\d{2})(\d{2})(\d{4})(\d{4})/, "$1 ($2) $3-$4");
    } else if (phone.length === 13) {
      phoneMasked = phone.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, "$1 ($2) $3-$4");
    }
    return phoneMasked;
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

  private overwritetUserData(user: IUsuario): IUsuario {
    const newUser: IUsuario = {
      id: user.id,
      name: user.name,
      cpf: user.cpf.replace(/\D/g, ''),
      email: user.email,
      phone: user.phone.replace(/\D/g, '')
    };

    return new usuarioModel(newUser);
  }

  private overwriteLocalStorage(storageName: string, data: any) {
    localStorage.removeItem(storageName);
    localStorage.setItem(storageName, JSON.stringify(data));
  }
}
