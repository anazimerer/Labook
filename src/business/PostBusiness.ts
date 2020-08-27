import HashManager from "../services/HashManager";
import Authenticator from "../services/Authenticator";
import UserDatabase from "../data/UserDatabase";
import IdGenerator from "../services/IdGenerator";
import PostDatabase from "../data/PostDatabase";

export default class PostBusiness {
  public async createPost(
    urlPhoto: string,
    description: string,
    creationDate: string,
    type: string,
    userCreatorId: string
  ): Promise<void> {
    const postDatabase = new PostDatabase();
    const postId = new IdGenerator().generateId();
    await postDatabase.createPost(
      postId,
      urlPhoto,
      description,
      creationDate,
      type,
      userCreatorId
    );
  }
}
