import express from "express";
import PostsController from "../controller/PostsController";

export const postsRouter = express.Router();

postsRouter.get("/feed", new PostsController().getFeedByUserId);
postsRouter.get("/feed/:type", new PostsController().getFeedByType);
