import Authenticator from "../services/Authenticator";
import PostsDatabase from "../data/PostDatabase";
import moment from "moment";
import { PostAndUserNameOutputDTO } from "../model/Post";

export class PostsBusiness {
  public async getFeed(token: string, type?: string): Promise<any[]> {
    const authenticationData = Authenticator.getData(token);

    const postDatabase = new PostsDatabase();
    const response = await postDatabase.getFeed(authenticationData.id, type);

    return response;
  }
}
