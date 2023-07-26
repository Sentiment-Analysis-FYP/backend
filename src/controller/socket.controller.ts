// send update message to client

import WebSocket from "ws";
import {socketClients} from "../index";

export const sendCompletionNotice = (email: string) => {
    const socket = socketClients.get(email)

    if (!socket) {
        console.log(`No user socket found matching ${email}`)
        return
    }

    socket.send(JSON.stringify({
        isComplete: true
    }))
}