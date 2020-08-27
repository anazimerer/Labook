import BaseDatabase from "./BaseDatabase";

export default class PostsDatabase extends BaseDatabase {
  private static TABLE_NAME = "labook_post";

  public async getFeed(userId: string, type?: string): Promise<any[]> {
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
          labook_post p JOIN labook_user u ON p.user_id = u.id
          JOIN labook_user_relationship f ON f.friend_id = u.id
      WHERE
          f.user_id = '${userId}'
      ${type ? `AND p.type = '${type}'` : ""}
      ORDER BY p.creation_date DESC
    `);
    return response[0];
  }
}
