import { Component, OnInit, ViewChild } from '@angular/core';
import { IUsuario } from 'src/app/interfaces/usuario.interface';
import { UserService } from 'src/app/services/users/user.service';
import { MatDialog } from '@angular/material/dialog';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ListaDeUsuariosComponent } from './lista-de-usuarios/lista-de-usuarios.component';
import { UserDataSharedService } from 'src/app/services/users/user-data-shared.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild(ListaDeUsuariosComponent) listaComponent!: ListaDeUsuariosComponent;

  usuario: IUsuario = {
    name: '',
    cpf: '',
    phone: '',
    email: '',
  };

  constructor(
    private userService: UserService,
    private shared: UserDataSharedService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.editarUsuarioListener();
  }

  editarUsuarioListener() {
    this.shared.getUser$()
      .pipe(
        map((usuario: IUsuario) => {
          this.usuario = usuario;
          if (this.usuario.id! > 0)
            this.openCadastro();
        })
      ).subscribe();
  }

  openCadastro() {
    const dialogRef = this.dialog
      .open(CadastroComponent, {
        disableClose: true,
        autoFocus: true,
        width: '100%',
      });

    dialogRef.afterClosed().subscribe(result => {
      this.usuario = { id: 0, name: '', cpf: '', email: '', phone: '' }
      this.shared.setUser(this.usuario)
      this.listaComponent.fetchUsers();
    });
  }
}
