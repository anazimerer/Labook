import express from "express";
import PostController from "../controller/PostController";

export const postRouter = express.Router();

postRouter.post("/newpost", new PostController().createPost);
postRouter.get("/feed/:type/:page", new PostController().getFeedByType);
postRouter.get("/feed", new PostController().getFeedByUserId);

postRouter.post("/:postId/like", new PostController().likePost);
postRouter.post("/:postId/unlike", new PostController().unlikePost);

postRouter.post("/:postId/comment", new PostController().createComment);
