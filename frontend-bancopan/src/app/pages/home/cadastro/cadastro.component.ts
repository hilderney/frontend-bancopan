import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, Observable, pipe, take } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { IUsuario } from 'src/app/interfaces/usuario.interface';
import { UserService } from 'src/app/services/users/user.service';
import { UserDataSharedService } from 'src/app/services/users/user-data-shared.service';
import { CpfPipe } from 'src/app/shared/pipes/cpf.pipe';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  @ViewChild('userCpf') userCpf!: ElementRef;
  @ViewChild('userPhone') userPhone!: ElementRef;

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
        take(1),
        map(
          (usuario: IUsuario) => {
            if (usuario.id! > 0) {
              this.form.patchValue({
                id: usuario.id,
                name: usuario.name,
                cpf: this.service.addCpfFormat(usuario.cpf),
                email: usuario.email,
                phone: this.service.addPhoneFormat(usuario.phone)
              });
              this.cadastrando = false;
              this.form.updateValueAndValidity();
            }
          }
        )
      )
      .subscribe(response => {

      });
  }

  closeDialod(): void {
    this.form.reset();
    this.dialogRef.close();
  }

  cadastrarUsuario() {
    if (this.form.valid) {
      if (this.form.controls['id'].value === 0)
        this.service.addUser(this.form.getRawValue());
      else
        this.service.updateUser(this.form.getRawValue());
      this.closeDialod();
    } else
      console.log('formulário inválido');
  }
}
