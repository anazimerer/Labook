import express from "express";
import PostController from "../controller/PostController";

export const postRouter = express.Router();
postRouter.post("/newpost", new PostController().createPost);
