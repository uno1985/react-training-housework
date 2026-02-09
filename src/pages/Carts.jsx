import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form"
import { useMsg } from "../context/MsgContext";
import { formatNumber } from "../utils/formatNumber";

import '../styles/carts.css'

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

// ==========================================
// 步驟進度條元件
// ==========================================
const CheckoutSteps = ({ currentStep }) => {
    const steps = [
        { num: 1, label: '購物車' },
        { num: 2, label: '填寫資料' },
        { num: 3, label: '確認訂單' },
        { num: 4, label: '訂單完成' },
    ]

    return (
        <div className="checkout-steps">
            {steps.map((step, index) => (
                <div key={step.num} className="checkout-step-wrapper">
                    {/* 用一個 div 把圓圈和文字包起來 */}
                    <div className="checkout-step-circle">
                        <div className={`checkout-step ${currentStep >= step.num ? 'active' : ''} ${currentStep > step.num ? 'done' : ''}`}>
                            {currentStep > step.num ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0" />
                                </svg>
                            ) : (
                                step.num
                            )}
                        </div>
                        <span className={`checkout-step-label ${currentStep >= step.num ? 'active' : ''}`}>
                            {step.label}
                        </span>
                    </div>
                    {/* 連接線（最後一個不需要） */}
                    {index < steps.length - 1 && (
                        <div className={`checkout-step-line ${currentStep > step.num ? 'active' : ''}`}></div>
                    )}
                </div>
            ))}
        </div>
    )
}


// ==========================================
// Step 1：購物車
// ==========================================
const StepCart = ({ onNext, cart, onChangeQty, delAllProduct, delProduct, loadingIds }) => {

    return (
        <div className="checkout-content">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-bold mb-0">購物車 {cart.id} </h3>
                <button className="btn btn-outline-danger btn-sm" onClick={() => delAllProduct()} hidden={cart.carts.length === 0}>清空購物車</button>
            </div>

            {/* 商品列表 */}
            <div className="table-responsive mb-4">
                <table className="table align-middle checkout-table">
                    <thead>
                        <tr>
                            <th>商品</th>
                            <th className="text-center" style={{ width: '150px' }}>數量</th>
                            <th className="text-end" style={{ width: '120px' }}>單價</th>
                            <th className="text-end" style={{ width: '120px' }}>小計</th>
                            <th className="text-end" style={{ width: '60px' }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.carts.map((item) => (

                            <tr key={item.id}
                                className={`
                    ${loadingIds[item.id] ? 'tr-loading' : ''}
                    ${loadingIds[item.id] ? 'tr-sweep' : ''}
                `}>
                                <td>
                                    <div className="d-flex align-items-center gap-3">
                                        <img
                                            src={item.product.imageUrl}
                                            alt={item.product.title}
                                            className="checkout-product-img"
                                        />
                                        <div>
                                            <div className="fw-semibold">{item.product.title}</div>
                                            <small className="text-muted">{item.product.category}</small>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="qty-control mx-auto">
                                        <button className="btn-qty" onClick={() => onChangeQty(item.id, item.qty - 1)} disabled={item.qty <= 1 || loadingIds[item.id]}>-</button>
                                        <span className="qty-number">{item.qty}</span>
                                        <button className="btn-qty" onClick={() => onChangeQty(item.id, item.qty + 1)} disabled={loadingIds[item.id]}>+</button>
                                    </div>
                                </td>
                                <td className="text-end fw-bold">NT$ {formatNumber(item.product.price)}</td>
                                <td className="text-end fw-bold">NT$ {formatNumber(item.total)}</td>
                                <td className="text-end">
                                    <button className="btn-remove" aria-label="刪除" onClick={() => delProduct(item.id)} disabled={loadingIds[item.id]}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* 優惠碼 + 總計 */}
            <div className="row g-4 mb-4">
                <div className="col-md-6">
                    {/* <div className="coupon-box">
                        <input type="text" className="form-control" placeholder="輸入優惠碼" />
                        <button className="btn btn-outline-dark">套用</button>
                    </div> */}
                </div>
                <div className="col-md-6">
                    <div className="checkout-summary">
                        <div className="summary-row">
                            <span>商品小計</span>
                            <span>NT$ {formatNumber(cart.final_total)}</span>
                        </div>
                        <div className="summary-row">
                            <span>運費</span>
                            <span className="text-success">免運費</span>
                        </div>
                        <hr />
                        <div className="summary-row total">
                            <span>總計</span>
                            <span>NT$ {formatNumber(cart.final_total)}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 按鈕 */}
            <div className="checkout-actions">
                <Link to="/products" className="btn btn-outline-secondary">繼續購物</Link>
                <button className="btn btn-yellow px-5" onClick={onNext}>下一步</button>
            </div>
        </div>
    )
}


const OrderCartList = (cart, step) => {
    return (
        <div className="checkout-form-card bg-light">
            <h5 className="fw-bold mb-3">{step === 'setp2' ? '訂單摘要' : '訂單明細'}</h5>

            {/* 摘要商品 */}
            {cart.carts.map((item) => (
                <div className="summary-product" key={item.id}>
                    <img src={item.product.imageUrl}
                        alt={item.product.title} />
                    <div>
                        <div className="fw-semibold small">{item.product.title}</div>
                        <div className="text-muted small">x {item.qty}</div>
                    </div>
                    <div className="ms-auto fw-bold small">NT$ {formatNumber(item.product.price)}</div>
                </div>
            ))}
            <hr />
            <div className="summary-row">
                <span>商品小計</span>
                <span>NT$ {formatNumber(cart.final_total)}</span>
            </div>
            <div className="summary-row">
                <span>運費</span>
                <span className="text-success">免運費</span>
            </div>
            <hr />
            <div className="summary-row total">
                <span>{step === 'setp2' ? '總計' : '應付金額'}</span>
                <span>NT$ {formatNumber(cart.final_total)}</span>
            </div>
        </div>
    )
}




// ==========================================
// Step 2：填寫資料
// ==========================================
const StepInfo = ({ onPrev, changeOrderVisitor, register, handleSubmit, cart, errors }) => {
    return (
        <div className="checkout-content">
            <form onSubmit={handleSubmit(changeOrderVisitor)}>
                <h3 className="fw-bold mb-4">填寫訂購資料</h3>
                <div className="row g-4">
                    <div className="col-lg-7">
                        <div className="checkout-form-card">
                            <h5 className="fw-bold mb-3">收件人資訊</h5>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label">姓名 <span className="text-danger">*</span></label>
                                    <input type="text" className="form-control" placeholder="請輸入姓名" {...register("name", {
                                        required: " 姓名 必填",
                                        minLength: {
                                            value: 2,
                                            message: "至少輸入 2 個字元",
                                        },
                                    })} />
                                    <span className="error-text">{errors.name ? errors.name.message : ''}</span>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">電話 <span className="text-danger">*</span></label>
                                    <input type="tel" className="form-control" placeholder="0912-345-678" maxLength={10} {...register("tel", {
                                        required: " 電話 必填",
                                        pattern: {
                                            value: /^[0-9]{10}$/,
                                            message: "電話號碼不足10碼",
                                        },

                                    })} />
                                    <span className="error-text">{errors.tel ? errors.tel.message : ''}</span>
                                </div>
                                <div className="col-12">
                                    <label className="form-label">Email <span className="text-danger">*</span></label>
                                    <input type="email" className="form-control" placeholder="name@example.com" {...register("email", {
                                        required: " Email 必填",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "請輸入有效的 Email 格式",
                                        },
                                    })} />
                                    <span className="error-text">{errors.email ? errors.email.message : ''}</span>
                                </div>
                                <div className="col-12">
                                    <label className="form-label">收件地址 <span className="text-danger">*</span></label>
                                    <input type="text" className="form-control" placeholder="請輸入完整地址" {...register("address", {
                                        required: " 地址 必填",
                                        minLength: {
                                            value: 4,
                                            message: "至少輸入 4 個字元",
                                        },
                                    })} />
                                    <span className="error-text">{errors.address ? errors.address.message : ''}</span>
                                </div>
                                <div className="col-12">
                                    <label className="form-label">備註</label>
                                    <textarea className="form-control" rows="3" placeholder="有什麼需要告訴我們的嗎？（選填）" {...register("message")}></textarea>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* 右側：訂單摘要 */}
                    <div className="col-lg-5">
                        {OrderCartList(cart, 'setp2')}
                    </div>
                </div>

                {/* 按鈕 */}
                <div className="checkout-actions mt-4">
                    <button type="button" className="btn btn-outline-secondary" onClick={onPrev}>上一步</button>
                    <button type="submit" className="btn btn-yellow px-5" >下一步</button>
                </div>
            </form>
        </div>
    )
}


// ==========================================
// Step 3：確認訂單
// ==========================================
const StepPayment = ({ onPrev, cart, orderVisitor, sendNewOrder }) => {
    return (
        <div className="checkout-content">
            <h3 className="fw-bold mb-4">確認訂單與付款</h3>

            <div className="row g-4">
                <div className="col-lg-7">
                    {/* 收件資訊預覽 */}
                    <div className="checkout-form-card mb-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h5 className="fw-bold mb-0">收件資訊</h5>
                            <button className="btn btn-sm btn-outline-secondary" onClick={onPrev}>修改</button>
                        </div>
                        <div className="confirm-info">
                            <div className="confirm-info-row">
                                <span className="confirm-label">收件人</span>
                                <span>{orderVisitor.name}</span>
                            </div>
                            <div className="confirm-info-row">
                                <span className="confirm-label">電話</span>
                                <span>{orderVisitor.tel}</span>
                            </div>
                            <div className="confirm-info-row">
                                <span className="confirm-label">Email</span>
                                <span>{orderVisitor.email}</span>
                            </div>
                            <div className="confirm-info-row">
                                <span className="confirm-label">地址</span>
                                <span>{orderVisitor.address}</span>
                            </div>
                            <div className="confirm-info-row">
                                <span className="confirm-label">備註</span>
                                <span>{orderVisitor.message}</span>
                            </div>
                        </div>
                    </div>

                    {/* 付款方式 */}
                    <div className="checkout-form-card">
                        <h5 className="fw-bold mb-3">付款方式</h5>
                        <div className="payment-options">
                            {/* <label className="payment-option ">
                                <input type="radio" name="payment" />
                                <div className="payment-option-content">
                                    <span className="fw-semibold">信用卡</span>
                                    <span className="text-muted small">Visa / Mastercard / JCB</span>
                                </div>
                            </label>
                            <label className="payment-option">
                                <input type="radio" name="payment" />
                                <div className="payment-option-content">
                                    <span className="fw-semibold">ATM 轉帳</span>
                                    <span className="text-muted small">銀行轉帳付款</span>
                                </div>
                            </label> */}
                            <label className="payment-option">
                                <input type="radio" name="payment" defaultChecked />
                                <div className="payment-option-content">
                                    <span className="fw-semibold">超商取貨付款</span>
                                    <span className="text-muted small">至全家店到店取貨付款</span>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* 右側：最終訂單摘要 */}
                <div className="col-lg-5">

                    {OrderCartList(cart, 'setp3')}

                </div>
            </div>

            {/* 按鈕 */}
            <div className="checkout-actions mt-4">
                <button className="btn btn-outline-secondary" onClick={onPrev}>上一步</button>
                <button className="btn btn-yellow px-5" onClick={() => sendNewOrder()}>確認訂單</button>
            </div>
        </div>
    )
}


// ==========================================
// Step 4：訂單完成
// ==========================================
const StepComplete = ({ orderInfo }) => {


    return (
        <div className="checkout-content">
            <div className="checkout-complete">
                {/* 成功圖示 */}
                <div className="complete-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0" />
                    </svg>
                </div>

                <h2 className="fw-bold mb-2">感謝您的訂購！</h2>
                <p className="text-muted mb-4">我們已收到您的訂單，將盡快為您出貨。</p>

                {/* 訂單資訊卡片 */}
                <div className="complete-order-card">
                    <div className="complete-order-row">
                        <span className="text-muted">訂單編號</span>
                        <span className="fw-bold">{orderInfo.orderId}</span>
                    </div>
                    <div className="complete-order-row">
                        <span className="text-muted">訂單金額</span>
                        <span className="fw-bold">NT$ {formatNumber(orderInfo.total)}</span>
                    </div>
                    <div className="complete-order-row">
                        <span className="text-muted">付款方式</span>
                        <span>超商取貨付款</span>
                    </div>
                    <div className="complete-order-row">
                        <span className="text-muted">預計出貨</span>
                        <span>1-3 個工作日</span>
                    </div>
                </div>

                <p className="text-muted small mt-4">
                    訂單確認信已寄送至您的 Email，如有任何問題請聯繫客服。
                </p>

                <div className="d-flex gap-3 justify-content-center mt-4">
                    <Link to="/" className="btn btn-outline-secondary">回首頁</Link>
                    <Link to="/products" className="btn btn-yellow px-4">繼續購物</Link>
                </div>
            </div>
        </div>
    )
}


const Carts = () => {
    const [step, setStep] = useState(1);
    const { showMsg } = useMsg();
    const [orderVisitor, setOrderVisitor] = useState(null);
    const [orderInfo, setOrderInfo] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors }, } = useForm(
            {
                defaultValues: {

                },
            }
        );


    const [cart, setCart] = useState({
        carts: [],
        total: 0,
        final_total: 0,

    })

    const [loadingIds, setLoadingIds] = useState({})

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


    const startLoading = (id) => {
        setLoadingIds(prev => ({ ...prev, [id]: true }))
    }

    const stopLoading = (id) => {
        setTimeout(() => {
            setLoadingIds(prev => {
                const next = { ...prev }
                delete next[id]
                return next
            })
        }, 2000)
    }




    const delProduct = async (id) => {
        startLoading(id)
        try {
            await axios.delete(`${API_BASE}/api/${API_PATH}/cart/${id}`,)

            showMsg("商品已成功刪除", "success");
            getCart()
        } catch (error) {
            showMsg("刪除商品失敗", "error");

        }
        stopLoading(id)
    }

    const delAllProduct = async () => {

        try {
            await axios.delete(`${API_BASE}/api/${API_PATH}/carts`,)
            showMsg("已清空購物車", "success");
            getCart()
        } catch (error) {
            showMsg("您的購物車已無任何商品", "error");

        }

    }

    const onChangeQty = async (id, qty) => {
        startLoading(id)
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
        stopLoading(id)
    }

    const changeOrderVisitor = (data) => {
        setOrderVisitor(data)
        setStep(3)
    }

    const sendNewOrder = async () => {

        try {
            const data = {
                data: {
                    'user': orderVisitor,
                    'message': orderVisitor.message,
                }
            }
            const response = await axios.post(`${API_BASE}/api/${API_PATH}/order/`, data)
            showMsg(response.data.message, "success");
            setOrderInfo(response.data)
            setStep(4)
        } catch (error) {
            showMsg("訂單生成錯誤", "error");
        }
    }



    if (cart.carts.length === 0) {
        return <>
            <div className="container my-5 text-center p-6">
                <h2 className="fw-bold mb-4">您的購物車上未加入任何東西</h2>

                <div className="d-flex gap-3 justify-content-center mt-4">
                    <Link to="/" className="btn btn-outline-secondary">回首頁</Link>
                    <Link to="/products" className="btn btn-yellow px-4">繼續購物</Link>
                </div>
            </div>
        </>
    }

    return (
        <div className="container my-5">
            <CheckoutSteps currentStep={step} />
            {step === 1 && <StepCart
                cart={cart}
                onChangeQty={onChangeQty}
                delAllProduct={delAllProduct}
                delProduct={delProduct}
                loadingIds={loadingIds}
                onNext={() => setStep(2)} />}
            {step === 2 && <StepInfo
                register={register}
                handleSubmit={handleSubmit}
                changeOrderVisitor={changeOrderVisitor}
                cart={cart}
                errors={errors}
                onPrev={() => setStep(1)} onNext={() => setStep(3)} />}
            {step === 3 && <StepPayment
                cart={cart}
                orderVisitor={orderVisitor}
                sendNewOrder={sendNewOrder}

                onPrev={() => setStep(2)} />}
            {step === 4 && <StepComplete
                orderInfo={orderInfo} />}
        </div>
    )
}

export default Carts