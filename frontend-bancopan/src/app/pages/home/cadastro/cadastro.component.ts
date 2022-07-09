import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUsuario } from 'src/app/interfaces/usuario.interface';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  public form!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CadastroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IUsuario,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.iniciarFormulario();
    console.log('data', this.data);
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
    debugger;
    this.data = this.form.getRawValue();
    this.dialogRef.close();
  }
}
