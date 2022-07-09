import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { IUsuario } from 'src/app/interfaces/usuario.interface';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  usuarios: IUsuario[] = [
    {
      name: 'My name 1',
      cpf: '221.065.728.83',
      email: 'usuario@um.com',
      phone: '11981022578',
    }
    , {
      name: 'My name 2',
      cpf: '221.065.728.83',
      email: 'usuario@um.com',
      phone: '11981022578',
    }
  ];



  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    const teste = this.userService.fetchUsers()
      .pipe(take(1))
      .subscribe();
    console.log('retorno da Observable', teste);
  }

  identificarUsuario(index: number, usuario: IUsuario) {
    return usuario.name;
  }

}
