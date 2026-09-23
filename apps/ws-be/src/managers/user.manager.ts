import { RoomManager } from "./room.manager";

export interface User {socketId: string, userId: string };
export class UserManager{
  private user : User[]=[]
  private roomManager: RoomManager =  new RoomManager();


}
