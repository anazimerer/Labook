import BaseDatabase from "./BaseDatabase";
import { PostAndUserNameOutputDTO, Post } from "../model/Post";
import moment from "moment";
moment.locale("PT-BR");
export default class PostsDatabase extends BaseDatabase {
  private static TABLE_NAME = "labook_post";
  private static LIMIT = 5;

  public async getFeedByUserId(
    userId: string,
    type?: string
  ): Promise<PostAndUserNameOutputDTO[]> {
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
          u.name 
      FROM 
          labook_post p JOIN labook_user u ON p.user_creator_id = u.id
          JOIN labook_user_relationship f ON f.friend_id = u.id
      WHERE
          f.user_id = '${userId}'
      ${postType ? `AND p.type = '${postType}'` : ""}
      ORDER BY p.creation_date DESC
    `);
    BaseDatabase.destroyConnection();

    const feed: PostAndUserNameOutputDTO[] = response[0].map((item: any) => {
      const post: PostAndUserNameOutputDTO = {
        postId: item.post_id,
        urlPhoto: item.url_photo,
        description: item.description,
        creationDate: moment(item.creation_date).format("DD/MM/YYYY HH:mm"),
        type: item.type,
        userId: item.user_creator_id,
        userName: item.name,
      };
      return post;
    });

    return feed;
  }

  public async getFeedByUserId2(
    userId: string,
    page: number,
    type?: string
  ): Promise<PostAndUserNameOutputDTO[]> {
    const response = await this.getConnection()
      .from({ p: PostsDatabase.TABLE_NAME })
      .join({ u: "labook_user" }, { "p.user_creator_id": "u.id" })
      .join({ f: "labook_user_relationship" }, { "f.friend_id": "u.id" })
      .select(
        "p.post_id",
        "p.url_photo",
        "p.description",
        "p.creation_date",
        "p.type",
        "p.user_creator_id",
        "u.name"
      )
      .where({ "f.user_id": userId })
      .andWhere(type ? { type } : {})
      .orderBy("p.creation_date", "desc")
      .limit(PostsDatabase.LIMIT)
      .offset(PostsDatabase.LIMIT * (page - 1));
    BaseDatabase.destroyConnection();

    const feed: PostAndUserNameOutputDTO[] = response.map((item: any) => {
      const post: PostAndUserNameOutputDTO = {
        postId: item.post_id,
        urlPhoto: item.url_photo,
        description: item.description,
        creationDate: moment(item.creation_date).format("DD/MM/YYYY HH:mm"),
        type: item.type,
        userId: item.user_creator_id,
        userName: item.name,
      };

      return post;
    });
    return feed;
  }

  public async getFeedByType(
    type: string
  ): Promise<PostAndUserNameOutputDTO[]> {
    const response = await this.getConnection()({ p: PostsDatabase.TABLE_NAME })
      .join({ u: "labook_user" }, { "p.user_creator_id": "u.id" })
      .select(
        "p.post_id",
        "p.url_photo",
        "p.description",
        "p.creation_date",
        "p.type",
        "u.id as user_creator_id",
        "u.name"
      )
      .where({ type })
      .orderBy("creation_date", "desc");
    BaseDatabase.destroyConnection();

    const feed: PostAndUserNameOutputDTO[] = response.map((item: any) => {
      const post: PostAndUserNameOutputDTO = {
        postId: item.post_id,
        urlPhoto: item.url_photo,
        description: item.description,
        creationDate: moment(item.creation_date).format("DD/MM/YYYY HH:mm"),
        type: item.type,
        userId: item.user_creator_id,
        userName: item.name,
      };

      return post;
    });
    return feed;
  }
}
