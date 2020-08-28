import BaseDatabase from "./BaseDatabase";

export default class FriendshipDatabase extends BaseDatabase {
  private static TABLE_NAME = "labook_user_relationship";

  public async makeNewFriend(userId: string, friendId: string): Promise<void> {
    await this.getConnection()
      .insert([
        { user_id: userId, friend_id: friendId },
        { user_id: friendId, friend_id: userId },
      ])
      .into(FriendshipDatabase.TABLE_NAME);
    await BaseDatabase.destroyConnection();
  }

  public async destroyThisFriendship(
    userId: string,
    friendId: string
  ): Promise<number> {
    const response = await this.getConnection()
      .delete()
      .where({ user_id: userId, friend_id: friendId })
      .orWhere({ user_id: friendId, friend_id: userId })
      .from(FriendshipDatabase.TABLE_NAME);
    await BaseDatabase.destroyConnection();

    return response;
  }
}
