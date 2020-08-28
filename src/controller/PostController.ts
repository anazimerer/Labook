import { Request, Response } from "express";
import PostBusiness from "../business/PostBusiness";
import { PostInputDTO } from "../model/Post";
import { CommentInputDTO } from "../model/Comment";

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

  async likePost(req: Request, res: Response) {
    const postBusiness: PostBusiness = new PostBusiness();
    try {
      await postBusiness.likePost(
        req.headers.authorization as string,
        req.params.postId
      );
      res.status(200).send({ message: "Like!" });
    } catch (e) {
      res.status(400).send({ message: e.sqlMessage || e.message });
    }
  }

  async unlikePost(req: Request, res: Response) {
    const postBusiness: PostBusiness = new PostBusiness();
    try {
      const sucess = await postBusiness.unlikePost(
        req.headers.authorization as string,
        req.params.postId
      );
      if (sucess) {
        res.status(200).send({ message: "Unlike!" });
      } else {
        res
          .status(422)
          .send({ message: "Para tirar o like é necessário ter um like" });
      }
    } catch (e) {
      res.status(400).send({ message: e.sqlMessage || e.message });
    }
  }

  async createComment(req: Request, res: Response) {
    const postBusiness: PostBusiness = new PostBusiness();
    try {
      const input: CommentInputDTO = {
        postId: req.params.postId,
        text: req.body.text,
      };
      await postBusiness.createComment(
        req.headers.authorization as string,
        input
      );
      res.status(200).send({ message: "Comment!" });
    } catch (e) {
      res.status(400).send({ message: e.sqlMessage || e.message });
    }
  }
}
