import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useOutletContext } from "react-router";
import { useMsg } from "../context/MsgContext";
import '../styles/product.css'
import { formatNumber } from "../utils/formatNumber";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;


const Product = () => {
    const params = useParams();
    const [product, setProduct] = useState([])
    const [productImg, setProductImg] = useState(null)
    const { setCartTrigger } = useOutletContext();

    const { showMsg } = useMsg();

    const { id } = params;


    useEffect(() => {

        const getProduct = async () => {
            try {
                const response = await axios.get(`${API_BASE}/api/${API_PATH}/product/${id}`)
                setProduct(response.data.product)
                setProductImg(response.data.product.imageUrl)


            } catch (error) {
                showMsg("網站出錯請重新整理網頁", "error");
            }

        }
        getProduct();
    }, [])

    const joinCart = async (id) => {
        const data = {
            data: {
                product_id: id,
                qty: 1
            }

        }
        try {
            const response = await axios.post(`${API_BASE}/api/${API_PATH}/cart`, data)

            setCartTrigger(prev => prev + 1);
            showMsg(response.data.message, "success");

        } catch (error) {
            showMsg("網站出錯請重新整理網頁", "error");
        }
    }




    return (<>



        <nav className="breadcrumb-unos">
            <span>{product.category}</span>
            <span className="sep">/</span>
            <span className="current">{product.title}</span>
        </nav>
        <div className="container mt-2">
            <div className="row g-4">

                <div className="col-12 col-md-6">
                    <div>
                        <img
                            src={productImg}
                            alt={product.title}
                            className="img-fluid rounded"
                            style={{ aspectRatio: "1 / 1", objectFit: "cover" }}
                        />
                    </div>
                    <div className="d-flex flex-wrap gap-2 mt-2">
                        <div>
                            <img
                                src={product.imageUrl}
                                alt={product.title}
                                className="img-fluid rounded thumbnail"
                                onClick={() => setProductImg(product.imageUrl)}
                            />
                        </div>
                        {
                            product.imagesUrl?.map((item, index) => (
                                <img
                                    src={item}
                                    alt={product.title}
                                    className="img-fluid rounded thumbnail"
                                    key={index}
                                    onClick={() => setProductImg(item)}

                                />
                            ))
                        }

                    </div>


                </div>

                <div className="col-12 col-md-6">
                    <p className="mb-2 badge categoryColor">
                        {product.category}
                    </p>
                    <h1 className="fw-bold mb-3">{product.title}</h1>

                    <p className="text-muted mb-2">
                        商品編號：{product.id}
                    </p>
                    <p className="text-muted mb-2">
                        售價：<del>{formatNumber(product.origin_price)}</del>
                    </p>

                    <h4 className="text-danger fw-bold mb-4">
                        NT$ {formatNumber(product.price)}
                    </h4>

                    <p className="product-description mb-4">
                        {product.description}
                    </p>

                    <div className="d-flex gap-3">
                        <button className="btn btn-yellow px-4" onClick={() => joinCart(product.id)}>
                            加入購物車
                        </button>

                    </div>
                </div>
            </div>
        </div>
        <div className="content mt-4">
            <h3>產品資訊</h3>
            <p className="product-content">{product.content}</p>

        </div>






    </>
    )
}
export default Product