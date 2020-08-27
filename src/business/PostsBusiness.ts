import Authenticator from "../services/Authenticator";
import PostsDatabase from "../data/PostDatabase";
import moment from "moment";
import { PostAndUserNameOutputDTO } from "../model/Post";

export class PostsBusiness {
  public async getFeed(token: string, type?: string): Promise<any[]> {
    const authenticationData = Authenticator.getData(token);

    const postDatabase = new PostsDatabase();
    const response = await postDatabase.getFeed(authenticationData.id, type);

    const posts: PostAndUserNameOutputDTO[] = response.map((item) => {
      const post: PostAndUserNameOutputDTO = {
        postId: item.post_id,
        urlPhoto: item.utl_photo,
        description: item.description,
        creationDate: moment(item.creation_date).format("DD/MM/YYYY HH:mm"),
        type: item.type,
        userId: item.user_creator_id,
        userName: item.user_creator_name,
      };
      return post;
    });

    return posts;
  }
}
