import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useMsg } from "../context/MsgContext";
import '../styles/carts.css'
import { formatNumber } from "../utils/formatNumber";



const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

const Carts = () => {
    const { showMsg } = useMsg();
    const [cart, setCart] = useState({
        carts: [],
        total: 0,
    })



    useEffect(() => {
        getCart()
    }, [])

    const getCart = async () => {
        try {
            const response = await axios.get(`${API_BASE}/api/${API_PATH}/cart`)
            setCart(response.data.data)
        } catch (error) {
            showMsg("網站出錯請重新整理網頁", "error");
        }
    }


    const delProduct = async (id) => {

        try {
            const response = await axios.delete(`${API_BASE}/api/${API_PATH}/cart/${id}`,)

            showMsg("商品已成功刪除", "error");
            getCart()
        } catch (error) {
            showMsg("刪除商品失敗", "error");

        }
    }

    const delAllProduct = async () => {

        try {
            const response = await axios.delete(`${API_BASE}/api/${API_PATH}/carts`,)
            showMsg("已清空購物車", "error");
            getCart()
        } catch (error) {
            showMsg("您的購物車已無任何商品", "error");

        }
    }

    const onChangeQty = async (id, qty) => {
        const data = {
            data: {
                product_id: id,
                qty,
            }
        }
        try {
            const response = await axios.put(`${API_BASE}/api/${API_PATH}/cart/${id}`, data)
            showMsg(response.data.message, "success");
            getCart()
        } catch (error) {

            showMsg("加入資料失敗", "error");
        }
    }


    return (
        <><div className="container my-5">
            <div className="row">
                <div className="col"><h2 className="mb-4 fw-bold">購物車結帳</h2></div>
                <div className="col text-end"><button className="btn btn-delete  px-4 text-end" onClick={() => delAllProduct()} >
                    清空購物車
                </button></div>
            </div>



            {/* 商品列表 */}
            <div className="table-responsive mb-4">
                <table className="table align-middle">
                    <thead className="table-light">
                        <tr>
                            <th>商品</th>
                            <th className="text-center">數量</th>
                            <th className="text-end">單價</th>
                            <th className="text-end">小計</th>
                            <th className="text-end">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.carts.map((item) => (
                            <tr key={item.id}>
                                <td>
                                    <div className="d-flex align-items-center gap-3">
                                        <img
                                            src={item.product.imageUrl}
                                            alt={item.product.title}
                                            style={{
                                                width: "60px",
                                                height: "60px",
                                                objectFit: "cover",
                                                borderRadius: "8px",
                                            }}
                                        />
                                        <div>
                                            <div className="fw-semibold">{item.title}</div>
                                            <small className="text-muted">
                                                {item.category}
                                            </small>
                                        </div>
                                    </div>
                                </td>
                                <td className="text-center">
                                    <div className="qty-control">
                                        <button className="btn-qty" onClick={() => onChangeQty(item.id, item.qty - 1)} disabled={item.qty <= 1}>-</button>
                                        <input type="number" name="qty" className="form-control" value={item.qty} readOnly='ture'></input>
                                        <button className="btn-qty" onClick={() => onChangeQty(item.id, item.qty + 1)}>+</button>
                                    </div>
                                </td>
                                <td className="text-end">NT$ {formatNumber(item.product.price)}</td>
                                <td className="text-end fw-bold">

                                    NT$ {formatNumber(item.total)}

                                </td>
                                <td className="btn-del text-end"><button className="btn btn-outline-secondary px-4" onClick={() => delProduct(item.id)}>
                                    刪除
                                </button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* 總金額 */}
            <div className="d-flex justify-content-end mb-4">
                <h4>
                    總金額：
                    <span className="text-danger fw-bold ms-2">
                        NT$ {formatNumber(cart.total)}
                    </span>
                </h4>
            </div>

            {/* 結帳按鈕 */}
            <div className="d-flex justify-content-end gap-3">

                <Link to='/products' className="btn btn-outline-secondary px-4">繼續購物</Link>
                <button className="btn btn-dark px-5">
                    送出訂單
                </button>
            </div>
        </div>
        </>

    )
}
export default Carts