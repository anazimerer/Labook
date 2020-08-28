import Authenticator from "../services/Authenticator";
import IdGenerator from "../services/IdGenerator";
import PostDatabase from "../data/PostDatabase";
import { PostInputDTO } from "../model/Post";
import { CommentInputDTO } from "../model/Comment";
import LikeDatabase from "../data/LikeDatabase";
import { CommentDatabase } from "../data/CommentDatabase";

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

  public async likePost(token: string, postId: string): Promise<void> {
    const userId = Authenticator.getData(token).id;

    await new LikeDatabase().likePost(postId, userId);
  }

  public async unlikePost(token: string, postId: string): Promise<void> {
    const userId = Authenticator.getData(token).id;

    await new LikeDatabase().unlikePost(postId, userId);
  }

  public async createComment(
    token: string,
    input: CommentInputDTO
  ): Promise<void> {
    const userId = Authenticator.getData(token).id;
    const commentId = new IdGenerator().generateId();

    await new CommentDatabase().createComment(
      commentId,
      input.postId,
      userId,
      input.text
    );
  }
}
