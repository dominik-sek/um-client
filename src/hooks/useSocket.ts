import {useEffect} from "react";
import socket from "../socket";
import {Message, useChatroomStore} from "../../store";

export const useSocket = () =>{
    const chatroomStore = useChatroomStore();
    useEffect(()=>{
        socket.connect();

        socket.on("connect",()=>{
            console.log("connected to socket")
        })
        socket.on("connect_error", (err:any)=>{
            console.log(`connect_error due to ${err.message}`);
        });
        socket.on("send-message", (message:Message)=>{
            console.log("sending message")
            chatroomStore.addMessage(message);
        })
        socket.on("create-chatroom", (chatroom)=>{
            console.log('joining chatroom: ', chatroom.id);
            chatroomStore.addChatroom(chatroom);
        });
        socket.on("new-message",(chatroomId)=>{
            console.log('Received new message in chatroom: ', chatroomId);
            socket.emit("join-chatroom", chatroomId);
        })
        socket.on("join-chatroom", (chatroom)=>{
            console.log('joining chatroom: ', chatroom.id);
            //if chatroom is already in store, update it
            if(chatroomStore.chatrooms.find((c)=>c.id === chatroom.id)){
                chatroomStore.updateMessageState(chatroom);
            }else{
                chatroomStore.addChatroom(chatroom);
            }
        });

        socket.on("chatrooms", (chatrooms)=>{
            console.log("populating chatrooms")
            chatroomStore.setChatrooms(chatrooms);
        });

        socket.on("seen-messages", (chatroom)=>{
            console.log("updating message state")
            chatroomStore.updateMessageState(chatroom);
        });

        return ()=>{
            socket.off("connect_error")
            socket.off("connect")
            socket.off("send-message")
            socket.off("create-chatroom")
            socket.off("chatrooms")
            socket.off("join-chatroom")
            socket.off("seen-message")
            socket.off("new-message")
        }
    },[chatroomStore])

}

export default useSocket;