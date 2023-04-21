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
        });

        socket.on("send-message", (message:Message)=>{
            console.log("SOCKET: sending message")
            console.log(message)
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
            //count how many objects in unreadMessages[]
            const totalUnreadCount = unreadMessages.reduce((acc: never, curr: { unread_count: number; })=> acc + curr.unread_count, 0);
            notifStore.updateTotalUnreadCount(totalUnreadCount);
            console.log("SOCKET: updating unread messages...", totalUnreadCount);
            unreadMessages.forEach((unreadMessage: { chatroom_id: number; unread_count: number; })=>{
                notifStore.updateUnreadCount(unreadMessage.chatroom_id, unreadMessage.unread_count);
            });
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
            // socket.off("user-typing")
        }
    },[chatroomStore, notifStore])

}

export default useSocket;