import {useState} from "react";

export const useShortMessage = (message:string, MAX_LENGTH = 10) => {
    const [shortMessage, setShortMessage] = useState(message.length > MAX_LENGTH ? message.substring(0, MAX_LENGTH) + "..." : message);
    return shortMessage;
}