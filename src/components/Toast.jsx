import { useEffect, useState } from "react";
import { useMsg } from "../context/MsgContext";
import '../styles/toast.css'

const Toast = () => {
    const { msg, type } = useMsg();
    const [leaving, setLeaving] = useState(false);

    useEffect(() => {
        if (!msg) return;

        // 2.6 秒開始滑出
        const leaveTimer = setTimeout(() => {
            setLeaving(true);
        }, 2600);

        return () => {
            clearTimeout(leaveTimer);
            setLeaving(false);
        };
    }, [msg]);

    if (!msg) return null;

    return (
        <div className={`toast-unos ${type} ${leaving ? "leaving" : ""}`}>
            <span className="toast-text">{msg}</span>
            <div className="toast-progress" />
        </div>
    );
};

export default Toast;
