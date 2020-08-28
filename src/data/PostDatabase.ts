import BaseDatabase from "./BaseDatabase";
import { PostAndUserNameOutputDTO } from "../model/Post";
import moment from "moment";

export default class PostsDatabase extends BaseDatabase {
  private static TABLE_NAME = "labook_post";
  private static LIMIT = 5;

  public async createPost(
    postId: string,
    urlPhoto: string,
    description: string,
    creationDate: string,
    type: string,
    userCreatorId: string
  ): Promise<void> {
    await this.getConnection()
      .insert({
        post_id: postId,
        url_photo: urlPhoto,
        description: description,
        creation_date: creationDate,
        type: type,
        user_creator_id: userCreatorId,
      })
      .into(PostsDatabase.TABLE_NAME);
    await BaseDatabase.destroyConnection();
  }

  public async getFeedByUserId2(
    userId: string,
    page: number,
    type?: string
  ): Promise<PostAndUserNameOutputDTO[]> {
    const whereType =
      type?.toUpperCase() === "NORMAL" || type?.toUpperCase() === "EVENT"
        ? { type }
        : {};

    const knex = this.getConnection();
    const response = await knex
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
        "u.name",
        knex("post_like")
          .count()
          .where("post_id", knex.ref("p.post_id"))
          .as("likesCount"),
        knex.raw(`(SELECT COUNT(1) 
                     FROM post_comment c 
                     WHERE c.post_id = p.post_id) AS commentsCount`)
      )
      .where({ "f.user_id": userId })
      .andWhere(whereType)
      .orderBy("p.creation_date", "desc")
      .limit(PostsDatabase.LIMIT)
      .offset(page > 0 ? PostsDatabase.LIMIT * (page - 1) : 0);

    await BaseDatabase.destroyConnection();

    const feed: PostAndUserNameOutputDTO[] = response.map((item: any) => {
      const post: PostAndUserNameOutputDTO = {
        postId: item.post_id,
        urlPhoto: item.url_photo,
        description: item.description,
        creationDate: moment(item.creation_date).format("DD/MM/YYYY HH:mm"),
        type: item.type,
        userId: item.user_creator_id,
        userName: item.name,
        likesCount: item.likesCount,
        commentsCount: item.commentsCount,
      };
      return post;
    });

    return feed;
  }

  public async getFeedByType(
    page: number,
    type: string
  ): Promise<PostAndUserNameOutputDTO[]> {
    const whereType =
      type.toUpperCase() === "NORMAL" || type?.toUpperCase() === "EVENT"
        ? { type }
        : {};
    const knex = this.getConnection();
    const response = await knex
      .from({ p: PostsDatabase.TABLE_NAME })
      .join({ u: "labook_user" }, { "p.user_creator_id": "u.id" })
      .select(
        "p.post_id",
        "p.url_photo",
        "p.description",
        "p.creation_date",
        "p.type",
        "u.id as user_creator_id",
        "u.name",
        knex("post_like")
          .count("*")
          .where("post_id", knex.ref("p.post_id"))
          .as("likesCount"),
        knex.raw(`(SELECT COUNT(1) 
                     FROM post_comment c 
                     WHERE c.post_id = p.post_id) AS commentsCount`)
      )
      .where(whereType)
      .orderBy("creation_date", "desc")
      .limit(PostsDatabase.LIMIT)
      .offset(PostsDatabase.LIMIT * (page - 1) || 0);

    await BaseDatabase.destroyConnection();

    const feed: PostAndUserNameOutputDTO[] = response.map((item: any) => {
      const post: PostAndUserNameOutputDTO = {
        postId: item.post_id,
        urlPhoto: item.url_photo,
        description: item.description,
        creationDate: moment(item.creation_date).format("DD/MM/YYYY HH:mm"),
        type: item.type,
        userId: item.user_creator_id,
        userName: item.name,
        likesCount: item.likesCount,
        commentsCount: item.commentsCount,
      };

      return post;
    });
    return feed;
  }
}
