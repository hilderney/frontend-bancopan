import { Component, Inject, OnInit } from '@angular/core';
import { IUsuario } from 'src/app/interfaces/usuario.interface';
import { UserService } from 'src/app/services/users/user.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CadastroComponent } from './cadastro/cadastro.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  usuario: IUsuario = {
    name: '',
    cpf: '',
    phone: '',
    email: '',
  };

  constructor(
    private userService: UserService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  openCadastro() {
    const dialogRef = this.dialog
      .open(CadastroComponent, {
        disableClose: true,
        autoFocus: true,
        width: '100%',
      });

    dialogRef.afterClosed().subscribe(result => {
      this.usuario = result;
    });
  }
}
