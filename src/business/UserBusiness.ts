import HashManager from "../services/HashManager";
import Authenticator from "../services/Authenticator";
import UserDatabase from "../data/UserDatabase";
import IdGenerator from "../services/IdGenerator";

export default class UserBusiness {
  public async signup(
    name: string,
    email: string,
    password: string
  ): Promise<string> {
    const idGenerator = new IdGenerator();
    const authenticator = new Authenticator();
    const hashManager = new HashManager();
    const userDatabase = new UserDatabase();

    const id = idGenerator.generateId();
    const hashPassword = await hashManager.hash(password);
    await userDatabase.createUser(id, name, email, hashPassword);
    const token = authenticator.generateToken({ id });

    return token;
  }

  public async login(email: string, password: string) {
    const userDatabase = new UserDatabase();
    const user = await userDatabase.getUserByEmail(email);

    const hashManager = new HashManager();
    const isPasswordCorrect = hashManager.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new Error("Senha ou usuário inválida");
    }

    const token = new Authenticator().generateToken({ id: user.id });
    return token;
  }
}
