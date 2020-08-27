import { Request, Response } from "express";
import { PostsBusiness } from "../business/PostsBusiness";

export default class PostsController {
  async getFeedByUserId(req: Request, res: Response) {
    const postsBusiness: PostsBusiness = new PostsBusiness();
    try {
      const response = await postsBusiness.getFeedByUserId(
        req.headers.authorization as string,
        req.query.type as string
      );

      res.status(200).send({ posts: response });
    } catch (e) {
      res.status(400).send({ message: e.sqlMessage || e.message });
    }
  }
  async getFeedByType(req: Request, res: Response) {
    const postsBusiness: PostsBusiness = new PostsBusiness();
    try {
      const response = await postsBusiness.getFeedByType(
        req.headers.authorization as string,
        req.params.type as string
      );

      res.status(200).send({ posts: response });
    } catch (e) {
      res.status(400).send({ message: e.sqlMessage || e.message });
    }
  }
}
