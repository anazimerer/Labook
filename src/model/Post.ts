export class Post {
  constructor(
    private postId: string,
    private urlPhoto: string,
    private description: string,

    private creationDate: Date,
    private type: PostType,
    private userId: string

  ) {}

  getPostId() {
    return this.postId;
  }
  getUrlPhoto() {
    return this.urlPhoto;
  }
  getDescription() {
    return this.description;
  }
  getCreationDate() {
    return this.creationDate;
  }
  getType() {
    return this.type;
  }

  getUserId() {
    return this.userId;
  }

  setId(postId: string) {
    this.postId = postId;
  }
  setUtlPhoto(urlPhoto: string) {
    this.urlPhoto = urlPhoto;
  }
  setDescription(description: string) {
    this.description = description;
  }

  setCreationDate(creationDate: Date) {
    this.creationDate = creationDate;
  }
  setType(type: PostType) {
    this.type = type;
  }
  setUserId(userId: string) {
    this.userId = userId;
  }

  static toPostModel(post: any): Post {
    return new Post(
      post.post_id,
      post.url_photo,
      post.description,
      post.creation_date,
      post.type,
      post.user_creator_id

    );
  }
}


export interface PostAndUserNameOutputDTO {

  postId: string;
  urlPhoto: string;
  description: string;
  creationDate: string;

  type: PostType;
  userId: string;
  userName: string;
}

export enum PostType {
  NORMAL = "NORMAL",
  EVENT = "EVENT",

}
