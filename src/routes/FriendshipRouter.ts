import express from "express";
import FriendshipController from "../controller/FriendshipController";

export const friendshipRouter = express.Router();

friendshipRouter.post("/:friendId/befriend", new FriendshipController().makeNewFriends);
friendshipRouter.delete("/:friendId/unfriend", new FriendshipController().destroyThisFriendship);