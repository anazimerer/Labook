import BaseDatabase from "./BaseDatabase";
import { PostAndUserNameOutputDTO } from "../model/Post";
import moment from "moment";
moment.locale("PT-BR");
export default class PostsDatabase extends BaseDatabase {
  private static TABLE_NAME = "labook_post";

  public async getFeed(userId: string, type?: string): Promise<any[]> {
    const postType =
      type?.toUpperCase() === "NORMAL" || type?.toUpperCase() === "EVENT"
        ? type
        : undefined;
    const response = await this.getConnection().raw(`
      SELECT
          p.post_id,
          p.url_photo,
          p.description,
          p.creation_date,
          p.type,
          p.user_creator_id,
          u.name AS user_creator_name
      FROM 
          labook_post p JOIN labook_user u ON p.user_creator_id = u.id
          JOIN labook_user_relationship f ON f.friend_id = u.id
      WHERE
          f.user_id = '${userId}'
      ${postType ? `AND p.type = '${postType}'` : ""}
      ORDER BY p.creation_date DESC
    `);

    const posts: PostAndUserNameOutputDTO[] = response[0].map((item: any) => {
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
