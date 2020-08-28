import { Request, Response } from "express";
import PostBusiness from "../business/PostBusiness";
import { PostInputDTO } from "../model/Post";

export default class PostController {
  async createPost(req: Request, res: Response) {
    const postBusiness: PostBusiness = new PostBusiness();
    try {
      const postInputDTO: PostInputDTO = req.body;
      const token = req.headers.authorization as string;
      await postBusiness.createPost(token, postInputDTO);

      res.status(200).send({
        message: "Post criado!",
      });
    } catch (error) {
      res.status(400).send({ message: error.sqlMessage || error.message });
    }
  }
  async getFeedByUserId(req: Request, res: Response) {
    const postsBusiness: PostBusiness = new PostBusiness();
    try {
      const response = await postsBusiness.getFeedByUserId(
        req.headers.authorization as string,
        Number(req.query.page),
        req.query.type as string
      );

      res.status(200).send({ posts: response });
    } catch (e) {
      res.status(400).send({ message: e.sqlMessage || e.message });
    }
  }
  async getFeedByType(req: Request, res: Response) {
    const postsBusiness: PostBusiness = new PostBusiness();
    try {
      const response = await postsBusiness.getFeedByType(
        req.headers.authorization as string,
        Number(req.params.page),
        req.params.type
      );

      res.status(200).send({ posts: response });
    } catch (e) {
      res.status(400).send({ message: e.sqlMessage || e.message });
    }
  }
}
