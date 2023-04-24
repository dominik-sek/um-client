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
            console.log("SOCKET: connected to socket")
        })
        socket.on("connect_error", (err:any)=>{
            console.log(`SOCKET: connect_error due to ${err.message}`);
            //show toast
        });

        socket.on("send-message", (message:Message)=>{
            console.log("SOCKET: sending message")
            chatroomStore.addMessage(message);
        })
        socket.on("create-chatroom", (chatroom)=>{
            console.log('SOCKET: joining chatroom after creating: ', chatroom.id);
            chatroomStore.addChatroom(chatroom);
        });
        socket.on("new-message",(chatroomId)=>{
            console.log('SOCKET: Received new message in chatroom: ', chatroomId);
            socket.emit("join-chatroom", chatroomId);
        })
        socket.on("join-chatroom", (chatroom)=>{
            console.log('SOCKET: joining chatroom: ', chatroom.id);
            if(chatroomStore.chatrooms.find((c)=>c.id === chatroom.id)){
                chatroomStore.updateMessageState(chatroom);
                //update unread count

            }else{
                chatroomStore.addChatroom(chatroom);
            }
        });
        socket.on("chatrooms", (chatrooms)=>{
            console.log("SOCKET: populating chatrooms...")
            chatroomStore.setChatrooms(chatrooms);
        });
        socket.on("seen-messages", (chatroom)=>{
            console.log("SOCKET: updating message state to seen...")
            chatroomStore.updateMessageState(chatroom);
            
        });
        socket.on("unread-messages",(unreadMessages)=>{
            //todo: totalunreadcount is bugged
            const totalUnreadCount = unreadMessages.filter((unreadMessage: { unread_count: number; })=>unreadMessage.unread_count > 0).length;
            notifStore.updateTotalUnreadCount(totalUnreadCount);

            if(totalUnreadCount > 0){
                document.title = `UM (${totalUnreadCount})`;
            }else{
                document.title = `UM`;
            }
            console.log("SOCKET: updating unread messages...", totalUnreadCount, unreadMessages);
            unreadMessages.forEach((unreadMessage: { chatroom_id: number; unread_count: number; })=>{
                if(unreadMessage.unread_count > 0){
                    notifStore.updateUnreadCount(unreadMessage.chatroom_id, unreadMessage.unread_count);
                }
            });
        })
        socket.on("delete-chatroom",(chatroomId)=>{
            console.log("SOCKET: deleting chatroom...")
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