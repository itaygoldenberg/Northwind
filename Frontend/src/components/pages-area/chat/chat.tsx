import { io, Socket } from "socket.io-client";
import { appConfig } from "../../../utils/app-config";
import "./chat.css";
import { notify } from "../../../utils/notify";
import { useForm } from "react-hook-form";
import { ChatModel } from "../../../models/chat-model";
import { useState } from "react";

let socket: Socket = null!;

// crypto.randomUUID is only defined in a secure context - HTTPS or localhost.
// Over plain http on a server address it is missing, and calling it threw before
// the message was ever emitted. getRandomValues is present in both cases.
function newMessageId(): string {
    if (typeof crypto.randomUUID === "function") return crypto.randomUUID();
    const bytes = crypto.getRandomValues(new Uint8Array(16));
    return Array.from(bytes, b => b.toString(16).padStart(2, "0")).join("");
}

// Palette for the nickname colour. A native <input type="color"> opens an
// operating-system dialog that CSS cannot reach, so we build our own swatches.
const COLORS = ["#00ffcc", "#38bdf8", "#a78bfa", "#f472b6", "#fbbf24", "#f87171", "#4ade80", "#e2e8f0"];

export function Chat() {

    const { register, handleSubmit, watch, resetField, setFocus, setValue } = useForm<ChatModel>({
        defaultValues: { color: COLORS[0] }
    });

    const [chatList, setChatList] = useState<ChatModel[]>([]);

    const [isConnected, setIsConnected] = useState<boolean>(false);

    // The chosen colour. If it is not one of the presets, the custom swatch is the active one.
    const color = watch("color");
    const isCustomColor = !COLORS.includes(color);

    const nickname = watch("nickname");
    const message = watch("message");


    // Connect once to the socket server: 
    function connect(): void {

        socket = io(appConfig.serverUrl);

        socket.on("server-welcome", (msg: string) => {
            notify.success(msg);
        });

        socket.on("server-message", (chat: ChatModel) => {
            setChatList(chatList => [...chatList, chat]);
        });

        setIsConnected(true);
    }

    // Send message to server: 
    function send(chat: ChatModel): void {
        chat.id = newMessageId();
        socket.emit("client-message", chat);

        resetField("message"); 
        setFocus("message");   
    }

    // Disconnect from server: 
    function disconnect(): void {
        socket.disconnect();
        setIsConnected(false);
    }

    return (
        <>
        <h2 className="page-main-title">Live Chat</h2>

        <div className="Chat">

            <button disabled={isConnected || !nickname} onClick={connect}>Connect</button>
            <button disabled={!isConnected} className="disconnect-button" onClick={disconnect}>Disconnect</button>
            <hr />

            <form onSubmit={handleSubmit(send)}>

                <label>Color: </label>
                <div className="color-picker">
                    {COLORS.map(c => (
                        <label key={c} className="swatch" style={{ backgroundColor: c, color: c }}>
                            <input type="radio" value={c} {...register("color")} />
                        </label>
                    ))}

                    {/* Any other colour. The OS dialog cannot be styled, but the circle that opens it can. */}
                    <label
                        className={"swatch custom" + (isCustomColor ? " selected" : "")}
                        style={isCustomColor ? { backgroundColor: color, color } : undefined}
                        title="Any other colour">
                        <input type="color" value={isCustomColor ? color : "#ffffff"}
                               onChange={e => setValue("color", e.target.value)} />
                    </label>
                </div>

                <label>Nickname: </label>
                <input type="text" {...register("nickname")} placeholder="Enter Nickname" />

                <label>Message: </label>
                <input type="text" {...register("message")} placeholder="Enter Message" />

                <button disabled={!nickname || !message}>Send</button>
            </form>
            <hr />

            <div className="messages">
                {chatList.map(chat => <div key={chat.id} style={{color: chat.color}}>{chat.nickname}: {chat.message}</div>)}
            </div>

        </div>
        </>
    );
}
