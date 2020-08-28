export class Post {
  constructor(
    private postId: string,
    private urlPhoto: string,
    private description: string,
    private creationDate: string,
    private type: string,
    private postCreatorId: string
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
  getPostCreatorId() {
    return this.postCreatorId;
  }

  setPostId(postId: string) {
    this.postId = postId;
  }
  setUrlPhoto(urlPhoto: string) {
    this.urlPhoto = urlPhoto;
  }
  setDescription(description: string) {
    this.description = description;
  }
  setCreationDate(creationDate: string) {
    this.creationDate = creationDate;
  }

  setType(type: string) {
    this.type = type;
  }

  static toPostModel(post: any): Post {
    return new Post(
      post.postId,
      post.urlPhoto,
      post.description,
      post.creationDate,
      post.type,
      post.userCreatorId
    );
  }
}

export interface PostInputDTO {
  postId: string;
  urlPhoto: string;
  description: string;
  creationDate: string;
  type: string;
  userCreatorId: string;
}
