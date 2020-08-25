import BaseDatabase from "./BaseDatabase";

export default class UserDataBase extends BaseDatabase {
  private static TABLE_NAME: "labook_user";

  public async createUser(
    id: string,
    name: string,
    email: string,
    password: string
  ): Promise<void> {
    console.log(id, name, email, password + "testeeeeeeeee");
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

  public async getUserByEmail(email: string): Promise<any> {
    const result = await this.getConnection()
      .select()
      .from(UserDataBase.TABLE_NAME)
      .where({ email });
    await BaseDatabase.destroyConnection();
    return result;
  }
}
