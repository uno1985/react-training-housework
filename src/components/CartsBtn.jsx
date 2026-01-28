
import { Link } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import { useMsg } from "../context/MsgContext";
import '../styles/cartsbtn.css'


const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;


const CartBtn = ({ trigger }) => {
    const [cartCount, setCartCount] = useState(0)
    const { showMsg } = useMsg();

    useEffect(() => {
        const getCart = async () => {
            try {
                const response = await axios.get(`${API_BASE}/api/${API_PATH}/cart`)

                setCartCount(response.data.data.carts.length)

            } catch (error) {
                showMsg("網站出錯請重新整理網頁", "error");
            }
        }

        getCart()

    }, [trigger])


    return (<>

        <div className="floating-cart">
            <Link className="bi bi-cart" to='/carts'></Link>
            {cartCount > 0 && (
                <span className="floating-cart-badge" >{cartCount}</span>
            )}
        </div>

    </>)
}

export default CartBtn
