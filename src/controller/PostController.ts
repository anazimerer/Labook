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
}
