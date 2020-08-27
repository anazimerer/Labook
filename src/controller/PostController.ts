import { Request, Response } from "express";
import PostBusiness from "../business/PostBusiness";

export default class PostController {
  async createPost(req: Request, res: Response) {
    const postBusiness = new PostBusiness();
    try {
      const { urlPhoto, description, creationDate, type } = req.body;
      const token = req.headers.authorization as string;
      await postBusiness.createPost(
        token,
        urlPhoto,
        description,
        creationDate,
        type
      );

      res.status(200).send({
        message: "Post criado!",
      });
    } catch (error) {
      res.status(400).send({ message: error.sqlMessage || error.message });
    }
  }
}
