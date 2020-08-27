import Authenticator from "../services/Authenticator";
import PostsDatabase from "../data/PostDatabase";

export class PostsBusiness {
  public async getFeedByUserId(token: string, type?: string): Promise<any[]> {
    const authenticationData = Authenticator.getData(token);

    const postDatabase = new PostsDatabase();
    const response = await postDatabase.getFeedByUserId2(
      authenticationData.id,
      type
    );

    return response;
  }

  public async getFeedByType(token: string, type?: string): Promise<any[]> {
    Authenticator.getData(token);

    const postDatabase = new PostsDatabase();
    const response = await postDatabase.getFeedByType(type as string);

    return response;
  }
}
