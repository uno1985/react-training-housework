import { createContext, useContext, useState } from "react"

const MsgContext = createContext(null);





export const MsgProvider = ({ children }) => {
    const [msg, setMsg] = useState(null);
    const [type, setType] = useState("success");

    const showMsg = (message, msgType = "success") => {
        setMsg(message);
        setType(msgType);

        setTimeout(() => {
            setMsg(null);
        }, 3000);
    };

    return (
        <MsgContext.Provider value={{ msg, type, showMsg }}>
            {children}
        </MsgContext.Provider>
    );
};

export const useMsg = () => {
    const context = useContext(MsgContext);
    if (!context) {
        throw new Error("useMsg 必須在 <MsgProvider> 內使用");
    }
    return context;
};

