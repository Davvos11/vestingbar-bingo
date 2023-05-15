import useWebSocket, {ReadyState} from "react-use-websocket";
import React, {useState} from "react";
import style from "./Beamer.module.css"

export default function Beamer() {
    const [showBingo, setShowBingo] = useState(false);
    const [bingoText, setBingoText] = useState("");
    var bingoTimer = undefined;

    const [showInfo, setShowInfo] = useState(false);
    const [infoText, setInfoText] = useState("");
    var infoTimer = undefined;

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
            const data = JSON.parse(event.data)
            if (data.type === "bingo") {
                setBingoText(data.message);
                setShowBingo(true);
                // TODO create queue
                bingoTimer = setTimeout(() => {
                    // setBingoText("");
                    setShowBingo(false)
                }, 4000)
            } else if (data.type === "info") {
                setInfoText(data.message);
                setShowInfo(true);
                // TODO create queue
                bingoTimer = setTimeout(() => {
                    // setBingoText("");
                    setShowInfo(false)
                }, 10000)
            }
        }
    });

    return (
        <div className={style.app}>
            <div className={style.topLogo}>
                <img src="/koe.svg"/>
            </div>

            {readyState != ReadyState.OPEN ?
                <div className={style.loading}>
                    Loading...
                </div>

                :

                <>
                    <div className={[style.bingo, showBingo ? style.shown : style.hidden].join(" ")}>
                        <h1>BINGO!</h1>
                        <hr/>
                        <div className={style.text}>
                            {bingoText}
                        </div>
                    </div>
                    <div className={[style.info, showInfo ? style.shown : style.hidden].join(" ")}>
                        <div className={style.text}>
                            {infoText}
                        </div>
                    </div>
                </>
            }
        </div>
    );
}
