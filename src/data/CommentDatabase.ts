import BaseDatabase from "./BaseDatabase";

export class CommentDatabase extends BaseDatabase {
  private static TABLE_NAME = "post_comment";

  async createComment(
    commentId: string,
    postId: string,
    userId: string,
    text: string
  ): Promise<void> {
    await this.getConnection()
      .insert({
        comment_id: commentId,
        post_id: postId,
        user_id: userId,
        text,
      })
      .into(CommentDatabase.TABLE_NAME);
    await BaseDatabase.destroyConnection();
  }
}
