import { IUsuario } from "../interfaces/usuario.interface";

export class usuarioModel implements IUsuario {
  public id?: number;
  public name: string;
  public cpf: string;
  public phone: string;
  public email: string;

  constructor(usuario: IUsuario) {
    id: usuario.id ? usuario.id : this.gerarNovoId(usuario);
    name: usuario.name
    cpf: usuario.cpf
    phone: usuario.phone
    email: usuario.email
  }

  gerarNovoId(usuario: IUsuario) {

  }

}
