import {useEffect} from "react";
import socket from "../socket";
import {Message, useMessageStore} from "../../store";

export const useSocket = () =>{
    const messageStore = useMessageStore();
    
    useEffect(()=>{
        socket.connect();
        socket.on("connect",()=>{
            console.log("connected to socket");
        })
        socket.on("connect_error", (err:any)=>{
            console.log(`connect_error due to ${err.message}`);
        });
        socket.on("messages", (messages)=>{
            messageStore.setMessages(messages);
        })
        socket.on("send-message", (message:Message)=>{
            messageStore.addMessage(message);
        })
        socket.on("create-chatroom", (chatroom)=>{
            console.log(chatroom);
        });

        return ()=>{
            socket.off("connect_error")
            socket.off("connect")
            socket.off("messages")
        }
    },[messageStore])
}

export default useSocket;