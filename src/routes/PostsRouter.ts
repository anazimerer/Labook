import express from "express";
import PostsController from "../controller/PostsController";

export const postsRouter = express.Router();

postsRouter.get("/feed/:type/:page", new PostsController().getFeedByType);
postsRouter.get("/feed", new PostsController().getFeedByUserId);
