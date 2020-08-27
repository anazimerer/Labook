import express from "express";
import PostsController from "../controller/PostsController";

export const postsRouter = express.Router();

postsRouter.get("/feed", new PostsController().getFeed);
