import BaseDatabase from "./BaseDatabase";

export default class LikeDatabase extends BaseDatabase {
  private static TABLE_NAME = "post_like";

  async likePost(postId: string, userId: string): Promise<void> {
    await this.getConnection()
      .insert({ post_id: postId, user_id: userId })
      .into(LikeDatabase.TABLE_NAME);
    await BaseDatabase.destroyConnection();
  }

  async unlikePost(postId: string, userId: string): Promise<number> {
    const affectedRows = await this.getConnection()
      .del()
      .from(LikeDatabase.TABLE_NAME)
      .where({ post_id: postId, user_id: userId });
    await BaseDatabase.destroyConnection();
    return affectedRows;
  }
}
