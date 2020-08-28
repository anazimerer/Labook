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
}
