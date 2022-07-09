import { IUsuario } from "../interfaces/usuario.interface";

export class usuarioModel implements IUsuario {
  public id?: number;
  public name: string;
  public cpf: string;
  public phone: string;
  public email: string;

  constructor(usuario: IUsuario) {
    this.id = usuario.id ? usuario.id : this.gerarNovoId(usuario);
    this.name = usuario.name
    this.cpf = usuario.cpf
    this.phone = usuario.phone
    this.email = usuario.email
  }

  gerarNovoId(usuario: IUsuario): number {
    return 55;
  }

}
