import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { IUsuario } from "src/app/interfaces/usuario.interface";
import { usuarioModel } from "src/app/models/usuario.model";

@Injectable({
  providedIn: 'root'
})
export class UserDataSharedService {

  usuario = new BehaviorSubject<IUsuario>({ id: 0, name: '', cpf: '', email: '', phone: '' });
  refreshList = new BehaviorSubject<boolean>(false);

  getUser$() {
    return this.usuario.asObservable();
  }
  setUser(usuario: IUsuario) {
    this.usuario.next(usuario);
  }

  getRefreshList$() {
    return this.refreshList.asObservable();
  }
  setRefreshList(refresh: boolean) {
    this.refreshList.next(refresh);
  }

}
