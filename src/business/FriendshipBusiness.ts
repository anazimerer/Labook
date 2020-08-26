import Authenticator from "../services/Authenticator";
import FriendshipDatabase from "../data/FriendshipDatabase";


export default class FriendshipBusiness {
    public async makeNewFriend(token:string, friendId:string):Promise<void>{
        const friendshipDatabase = new FriendshipDatabase();
        const authenticationData = Authenticator.getData(token);
        await friendshipDatabase.makeNewFriend(authenticationData.id, friendId)
    }

    public async destroyThisFriendship(token:string, friendId:string):Promise<number>{
        const friendshipDatabase = new FriendshipDatabase();
        const authenticationData = Authenticator.getData(token);
        return friendshipDatabase.destroyThisFriendship(authenticationData.id, friendId)
    }


}