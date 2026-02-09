import axios from "axios"
import { createContext, useEffect, useState, useContext } from "react"

import { useMsg } from "./MsgContext";
const AuthContext = createContext(null);


//引入env設置
const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

export const AuthProvider = ({ children }) => {
    const { showMsg } = useMsg();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    //登入
    const checkLogin = async (username, password) => {

        try {
            const response = await axios.post(`${API_BASE}/admin/signin`, { username, password });
            // 取得token, expired 寫入 cookie 以及axios headers 
            const { token, expired } = response.data;
            document.cookie = `hexToken=${token};expires=${new Date(expired)};`;
            axios.defaults.headers.common['Authorization'] = token;

            showMsg(response.data.message);
            setUser(response.data.user);
            setLoading(false);

        } catch (error) {

            showMsg(error.response.data.message);
        }


    }
    //登出
    const checkLogout = async () => {
        try {
            const response = await axios.post(`${API_BASE}/logout`);

            showMsg(response.data.message);
            setUser(null);
            setLoading(true);
        } catch (error) {
            showMsg(error.response.data.message);
        }
    }

    return (
        <AuthContext.Provider value={{ user, checkLogin, checkLogout, loading }}>
            {children}
        </AuthContext.Provider>
    );


}


export const useAuth = () => useContext(AuthContext);