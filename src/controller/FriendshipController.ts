import { Request, Response } from "express";
import FriendshipBusiness from "../business/FriendshipBusiness";

export default class FriendshipController {
    async makeNewFriends(req: Request, res: Response): Promise<void> {
      const friendshipBusiness = new FriendshipBusiness();
      try {
        await friendshipBusiness.makeNewFriend(req.headers.authorization as string, req.params.friendId);
  
        res.status(200).send({ message: "Deu certo!" });
      } catch (error) {
        res.status(400).send({ message: error.sqlMessage || error.message });
      }
    }
  
    async destroyThisFriendship(req: Request, res: Response): Promise<void> {
      const friendshipBusiness = new FriendshipBusiness();
      try {
        const sucess = await friendshipBusiness.destroyThisFriendship(req.headers.authorization as string, req.params.friendId);
        if(sucess){
            res.status(200).send({ message: "Você está livre desse encosto!" });
        }
        else{
            res.status(422).send({ message: "Você não era amigo dessa pessoa!" }); 
        }
        } catch (error) {
        res.status(400).send({ message: error.sqlMessage || error.message });
      }
    }
  }