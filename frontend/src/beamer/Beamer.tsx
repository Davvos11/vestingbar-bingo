import useWebSocket, {ReadyState} from "react-use-websocket";
import React, {useState} from "react";
import style from "./Beamer.module.css"

export default function Beamer() {
    const [showBingo, setShowBingo] = useState(false);
    const [bingoText, setBingoText] = useState("");
    var timer = undefined;

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
            setBingoText(event.data);
            setShowBingo(true);
            // TODO create queue
            timer = setTimeout(() => {
                // setBingoText("");
                setShowBingo(false)
            }, 4000)
        }
    });

    return (
        <div className={style.app}>
            <div className={style.topLogo}>
                <img src="/koe.svg" />
            </div>

            {readyState != ReadyState.OPEN ?
                <div className={style.loading}>
                    Loading...
                </div>

                :

                <div className={[style.bingo, showBingo ? style.shown : style.hidden].join(" ")}>
                    <h1>BINGO!</h1>
                    <hr/>
                    <div className={style.text}>
                        {bingoText}
                    </div>
                </div>
            }
        </div>
    );
}
