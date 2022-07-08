import { Component, Input, OnInit } from '@angular/core';
import { IUsuario } from 'src/app/interfaces/usuario.interface';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  @Input() usuario!: IUsuario;

  constructor() {
    console.log(this.usuario)
  }

  ngOnInit() {
    console.log(this.usuario)
  }

}
