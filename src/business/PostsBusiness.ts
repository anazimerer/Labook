import Authenticator from "../services/Authenticator";
import PostsDatabase from "../data/PostDatabase";

export class PostsBusiness {
  public async getFeed(token: string, type?: string): Promise<any[]> {
    const authenticationData = Authenticator.getData(token);

    const postDatabase = new PostsDatabase();
    const response = await postDatabase.getFeed(authenticationData.id, type);

    return response;
  }
}
