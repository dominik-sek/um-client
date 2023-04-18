import {useEffect} from "react";
import socket from "../socket";
import {Message, useChatroomStore} from "../../store";

export const useSocket = () =>{
    const chatroomStore = useChatroomStore();
    useEffect(()=>{
        socket.connect();
        socket.on("connect",()=>{
            // console.log(chatroomStore.chatrooms)
            // chatroomStore.chatrooms.forEach((chatroom)=>{
            //     console.log('joining chatroom: ', chatroom.id)
            //     socket.emit("join-chatroom", chatroom.id);
            // });
        })
        socket.on("connect_error", (err:any)=>{
            console.log(`connect_error due to ${err.message}`);
        });
        socket.on("send-message", (message:Message)=>{
            console.log(message)
            chatroomStore.addMessage(message);
        })
        socket.on("create-chatroom", (chatroom)=>{
            chatroomStore.addChatroom(chatroom);
        });

        socket.on("chatrooms", (chatrooms)=>{
            chatroomStore.setChatrooms(chatrooms);
        });


        return ()=>{
            socket.off("connect_error")
            socket.off("connect")
            socket.off("send-message")
            socket.off("create-chatroom")
            socket.off("chatrooms")
            socket.off("join-chatroom")
        }
    },[chatroomStore])

}

export default useSocket;