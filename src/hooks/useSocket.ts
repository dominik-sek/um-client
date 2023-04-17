import {useEffect} from "react";
import socket from "../socket";

export const useSocket = () =>{
    useEffect(()=>{
        socket.connect();
        socket.on("connect",()=>{
            console.log("connected to socket");
        })
        socket.on("connect_error", (err:any)=>{
            console.log(`connect_error due to ${err.message}`);
        });
        return ()=>{
            socket.off("connect_error")
        }
    },[])
}

export default useSocket;