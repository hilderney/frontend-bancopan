import { Component, Input, OnInit } from '@angular/core';
import { IUsuario } from 'src/app/interfaces/usuario.interface';
import { UserDataSharedService } from 'src/app/services/users/user-data-shared.service';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  @Input() usuario!: IUsuario;

  constructor(
    private service: UserService,
    private shared: UserDataSharedService
  ) {
  }

  ngOnInit() {
  }

  editarUsuario(usuario: IUsuario) {
    if (this.service.updateUser(usuario) === 0)
      console.log('falha aoo editar usuário');

    console.log('usuário editado com sucesso');
    this.shared.setUser(usuario);

  }

  removerUsuario(usuario: IUsuario) {
    if (!usuario.id) {
      console.log('falha ao excluir, usuário não encontrado');
      return;
    }
    if (this.service.removeUser(usuario.id) === 0) {
      console.log('falha ao editar usuário');
      return;
    }

    console.log('usuário excluído com sucesso');
    this.shared.setRefreshList(true);
  }

}
