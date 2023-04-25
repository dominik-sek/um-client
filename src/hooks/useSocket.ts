import {useEffect} from "react";
import socket from "../socket";
import {Message, useChatroomStore, useNotifStore} from "../../store";

export const useSocket = () =>{
    const chatroomStore = useChatroomStore();
    // const userTypingState = useUserTypingState();
    const notifStore = useNotifStore();
    useEffect(()=>{
        socket.connect();
        socket.on("connect",()=>{
        })
        socket.on("connect_error", (err:any)=>{
            //show toast
        });

        socket.on("send-message", (message:Message)=>{
            chatroomStore.addMessage(message);
        })
        socket.on("create-chatroom", (chatroom)=>{
            chatroomStore.addChatroom(chatroom);
        });
        socket.on("new-message",(chatroomId)=>{
            socket.emit("join-chatroom", chatroomId);
        })
        socket.on("join-chatroom", (chatroom)=>{
            if(chatroomStore.chatrooms.find((c)=>c.id === chatroom.id)){
                chatroomStore.updateMessageState(chatroom);
                //update unread count

            }else{
                chatroomStore.addChatroom(chatroom);
            }
        });
        socket.on("chatrooms", (chatrooms)=>{
            chatroomStore.setChatrooms(chatrooms);
        });
        socket.on("seen-messages", (chatroom)=>{
            chatroomStore.updateMessageState(chatroom);
            
        });
        socket.on("unread-messages",(unreadMessages)=>{
            const totalUnreadCount = unreadMessages.filter((unreadMessage: { unread_count: number; })=>unreadMessage.unread_count > 0).length;
            notifStore.updateTotalUnreadCount(totalUnreadCount);

            if(totalUnreadCount > 0){
                document.title = `UM (${totalUnreadCount})`;
            }else{
                document.title = `UM`;
            }
            unreadMessages.forEach((unreadMessage: { chatroom_id: number; unread_count: number; })=>{
                if(unreadMessage.unread_count > 0){
                    notifStore.updateUnreadCount(unreadMessage.chatroom_id, unreadMessage.unread_count);
                }
            });
        })
        socket.on("delete-chatroom",(chatroomId)=>{
            chatroomStore.deleteChatroom(chatroomId);
        })

        return ()=>{
            socket.off("connect_error")
            socket.off("connect")
            socket.off("send-message")
            socket.off("create-chatroom")
            socket.off("chatrooms")
            socket.off("join-chatroom")
            socket.off("seen-messages")
            socket.off("new-message")
            socket.off("unread-messages")
            socket.off("delete-chatroom")
        }
    },[chatroomStore, notifStore])

}

export default useSocket;