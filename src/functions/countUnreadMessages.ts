import {IChatroom} from "../../store";

const countUnreadMessagesInChatrooms = (chatrooms: IChatroom[]) => {
    // chatrooms.reduce((chatroom)=>{
    //     return chatroom.message.reduce((message)=>{
    //         if(message.status === "unread"){
    //             return count++;
    //         }
    //     },0)
    //
    // return count;
}