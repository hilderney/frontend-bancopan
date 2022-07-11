import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { IUsuario } from 'src/app/interfaces/usuario.interface';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  public form!: FormGroup;

  constructor(
    private service: UserService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CadastroComponent>,
  ) { }

  ngOnInit() {
    this.iniciarFormulario();
  }

  iniciarFormulario() {
    this.form = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      cpf: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      phone: ['', Validators.compose([Validators.required])],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  cadastrarUsuario() {
    console.log('Register');
  }
}
