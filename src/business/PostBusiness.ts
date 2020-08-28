import Authenticator from "../services/Authenticator";
import IdGenerator from "../services/IdGenerator";
import PostDatabase from "../data/PostDatabase";
import { PostInputDTO } from "../model/Post";

export default class PostBusiness {
  public async createPost(token: string, input: PostInputDTO): Promise<void> {
    const postDatabase = new PostDatabase();
    const postId = new IdGenerator().generateId();
    const userAuthentication = Authenticator.getData(token);

    await postDatabase.createPost(
      postId,
      input.urlPhoto,
      input.description,
      input.creationDate,
      input.type,
      userAuthentication.id
    );
  }
  public async getFeedByUserId(
    token: string,
    page: number,
    type?: string
  ): Promise<any[]> {
    const authenticationData = Authenticator.getData(token);

    const postDatabase = new PostDatabase();
    const response = await postDatabase.getFeedByUserId2(
      authenticationData.id,
      page,
      type
    );

    return response;
  }

  public async getFeedByType(
    token: string,
    page: number,
    type?: string
  ): Promise<any[]> {
    Authenticator.getData(token);

    const postDatabase = new PostDatabase();
    const response = await postDatabase.getFeedByType(page, type as string);

    return response;
  }
}
