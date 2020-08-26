import BaseDatabase from "./BaseDatabase";
import {User} from "../model/User";


export default class UserDataBase extends BaseDatabase {
  private static TABLE_NAME = "labook_user";

  public async createUser(
    id: string,
    name: string,
    email: string,
    password: string
  ): Promise<void> {
    await this.getConnection()
      .insert({
        id,
        name,
        email,
        password,
      })
      .into(UserDataBase.TABLE_NAME);
    await BaseDatabase.destroyConnection();
  }

  public async getUserByEmail(email: string): Promise<User> {
    const result = await this.getConnection()
      .select()
      .from(UserDataBase.TABLE_NAME)
      .where({ email });
    await BaseDatabase.destroyConnection();
    return User.toUserModel(result[0]);
  }
}
