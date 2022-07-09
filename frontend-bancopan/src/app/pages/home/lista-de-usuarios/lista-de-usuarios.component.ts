import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { IUsuario } from 'src/app/interfaces/usuario.interface';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-lista-de-usuarios',
  templateUrl: './lista-de-usuarios.component.html',
  styleUrls: ['./lista-de-usuarios.component.scss']
})
export class ListaDeUsuariosComponent implements OnInit {

  usuarios!: IUsuario[];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    const teste = this.userService.fetchUsers()
      .pipe(take(1))
      .subscribe(
        resp => {
          this.usuarios = resp;
        }
      );
    console.log('retorno da Observable', teste);
  }
}
