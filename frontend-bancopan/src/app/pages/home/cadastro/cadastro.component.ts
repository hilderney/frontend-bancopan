import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, Observable, take } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { IUsuario } from 'src/app/interfaces/usuario.interface';
import { UserService } from 'src/app/services/users/user.service';
import { UserDataSharedService } from 'src/app/services/users/user-data-shared.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  cadastrando: boolean = true;

  public form!: FormGroup;

  constructor(
    private service: UserService,
    private formBuilder: FormBuilder,
    private shared: UserDataSharedService,
    public dialogRef: MatDialogRef<CadastroComponent>,
  ) { }

  ngOnInit() {
    this.iniciarFormulario();
    this.obterDadosUsuario();
  }

  iniciarFormulario() {
    this.form = this.formBuilder.group({
      id: [0],
      name: ['', Validators.compose([Validators.required])],
      cpf: ['', Validators.compose([Validators.required, Validators.minLength(14), Validators.maxLength(20)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      phone: ['', Validators.compose([Validators.required, Validators.minLength(14), Validators.maxLength(20)])],
    });
  }

  obterDadosUsuario() {
    this.shared.getUser$()
      .pipe(
        map(
          (usuario: IUsuario) => {
            if (usuario.id! > 0) {
              this.form.patchValue(usuario);
              this.cadastrando = false;
            }
          }
        )
      )
      .subscribe();
  }

  closeDialod(): void {
    this.form.reset();
    this.dialogRef.close();
  }

  cadastrarUsuario() {
    if (this.form.valid) {
      if (this.form.get('id')!.value > 0)
        this.service.addUser(this.form.getRawValue());
      else
        this.service.updateUser(this.form.getRawValue());
      this.closeDialod();
    } else
      console.log('formulário inválido');
  }
}
