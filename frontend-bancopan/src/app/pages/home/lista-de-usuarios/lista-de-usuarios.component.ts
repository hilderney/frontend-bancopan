import { Component, OnInit } from '@angular/core';
import { map, take } from 'rxjs';
import { IUsuario } from 'src/app/interfaces/usuario.interface';
import { UserDataSharedService } from 'src/app/services/users/user-data-shared.service';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-lista-de-usuarios',
  templateUrl: './lista-de-usuarios.component.html',
  styleUrls: ['./lista-de-usuarios.component.scss']
})
export class ListaDeUsuariosComponent implements OnInit {

  usuarios!: IUsuario[];

  constructor(
    private userService: UserService,
    private shared: UserDataSharedService
  ) { }

  ngOnInit() {
    this.fetchUsers();
    this.refreshListListener();
  }

  fetchUsers() {
    this.userService.fetchUsers()
      .pipe(take(1))
      .subscribe(
        response => {
          this.usuarios = response;
        }
      );
  }

  refreshListListener() {
    this.shared.getRefreshList$()
      .pipe(
        map(refresh => {
          if (refresh)
            this.fetchUsers();
        })
      ).subscribe();
  }
}
