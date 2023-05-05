import useWebSocket from "react-use-websocket";
import {entries} from "../config";
import style from "./Dashboard.module.css";

export default function Dashboard() {
    const socketUrl = "ws://" + window.location.hostname + ":8080/ws";

    const {
        sendMessage,
        sendJsonMessage,
        lastMessage,
        lastJsonMessage,
        readyState,
        getWebSocket,
    } = useWebSocket(socketUrl, {
        onOpen: () => console.log('opened'),
        //Will attempt to reconnect on all close events, such as server shutting down
        shouldReconnect: (closeEvent) => true,
        onMessage: (event: WebSocketEventMap['message']) => {

        }
    });

    return <div className={style.dashboard}>
        <div className={style.entries}>
            {entries.map((entry) => {
                return <button onClick={() => sendMessage(entry)}>{entry}</button>;
            })}
        </div>
    </div>
}
