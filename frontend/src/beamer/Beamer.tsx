import useWebSocket, {ReadyState} from "react-use-websocket";
import React from "react";
import style from "./Beamer.module.css"

export default function Beamer() {
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

                <div className={style.bingo}>
                    <h1>BINGO!</h1>
                    <hr/>
                    <div className={style.text}>
                        Een bingokaart entry, biertjens ofzo
                    </div>
                </div>
            }
        </div>
    );
}
