import { IUsuario } from "../interfaces/usuario.interface";
import { UserService } from "../services/users/user.service";

export class usuarioModel implements IUsuario {
  public id: number;
  public name: string;
  public cpf: string;
  public phone: string;
  public email: string;

  constructor(usuario: IUsuario) {
    this.id = usuario.id;
    this.name = usuario.name
    this.cpf = usuario.cpf
    this.phone = usuario.phone
    this.email = usuario.email
  }
}
