import { Component, OnInit } from '@angular/core';
import { IUsuario } from 'src/app/interfaces/usuario.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  usuarios: IUsuario[] = [
    {
      nome: 'Usuário Um',
      cpf: '221.065.728.83',
      email: 'usuario@um.com',
      telefone: '11981022578',
    }
    , {
      nome: 'Usuário Dois',
      cpf: '221.065.728.83',
      email: 'usuario@um.com',
      telefone: '11981022578',
    }
  ];



  constructor() { }

  ngOnInit() {
  }

  identificarUsuario(index: number, usuario: IUsuario) {
    console.log(usuario)
    return usuario.nome;
  }

}
