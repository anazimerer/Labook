import { Request, Response } from "express";
import { PostsBusiness } from "../business/PostsBusiness";

export default class PostsController {
  async getFeed(req: Request, res: Response) {
    const postsBusiness: PostsBusiness = new PostsBusiness();
    try {
      const response = await postsBusiness.getFeed(
        req.headers.authorization as string
      );

      res.status(200).send({ posts: response });
    } catch (e) {
      res.status(400).send({ message: e.sqlMessage || e.message });
    }
  }
}
