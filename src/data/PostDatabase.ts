import BaseDatabase from "./BaseDatabase";

export default class PostDatabase extends BaseDatabase {
  private static TABLE_NAME = "labook_post";

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
      .into(PostDatabase.TABLE_NAME);
    await BaseDatabase.destroyConnection();
  }
}
