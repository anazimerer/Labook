import express from "express";
import PostsController from "../controller/PostsController";

export const postsRouter = express.Router();

postsRouter.put("/feed", new PostsController().getFeed);
