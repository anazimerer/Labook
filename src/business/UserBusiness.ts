import HashManager from "../services/HashManager";
import Authenticator from "../services/Authenticator";
import UserDatabase from "../data/UserDatabase";
import IdGenerator from "../services/IdGenerator";
import { SignupInputDTO, LoginInputDTO } from "../model/User";

export default class UserBusiness {
  public async signup(input: SignupInputDTO): Promise<string> {
    if (!input.email || !input.email.includes("@")) {
      throw new Error("Email invalido!");
    }

    if (!input.password || input.password.length < 6) {
      throw new Error("Sua senha deve conter no minimo 6 caracteres");
    }

    const idGenerator = new IdGenerator();
    const authenticator = new Authenticator();
    const hashManager = new HashManager();
    const userDatabase = new UserDatabase();

    const id = idGenerator.generateId();
    const hashPassword = await hashManager.hash(input.password);
    await userDatabase.createUser(id, input.name, input.email, hashPassword);
    const token = authenticator.generateToken({ id });

    return token;
  }

  public async login(input: LoginInputDTO) {
    if (!input.email) {
      throw new Error("Email invalido!");
    }

    if (!input.password) {
      throw new Error("Digite sua senha");
    }

    const userDatabase = new UserDatabase();
    const user = await userDatabase.getUserByEmail(input.email);

    if (!user) {
      throw new Error("Conta invalida");
    }

    const hashManager = new HashManager();
    const isPasswordCorrect = await hashManager.compare(
      input.password,
      user.getPassword()
    );

    if (!isPasswordCorrect) {
      throw new Error("Senha ou usuário inválida");
    }

    const token = new Authenticator().generateToken({ id: user.getId() });
    return token;
  }
}
