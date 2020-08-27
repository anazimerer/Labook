import express from "express";
import PostController from "../controller/PostController";

export const postRouter = express.Router();
postRouter.post("/post", new PostController().createPost);
