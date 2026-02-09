import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Link, useOutletContext } from "react-router";
import { useMsg } from "../context/MsgContext";
import { Modal } from "bootstrap";
import { Hearts } from "react-loader-spinner";
import { useForm } from "react-hook-form"
import { formatNumber } from "../utils/formatNumber";

import '../styles/products.css'

//引入env設置
const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;



const Products = () => {
	const { showMsg } = useMsg();
	const [products, setProducts] = useState([]);
	const [tempProduct, setTempProduct] = useState({});
	const { setCartTrigger } = useOutletContext();
	const productModalRef = useRef(null);
	const [qty, setQty] = useState(1)
	const [isLoading, setIsLoading] = useState(false);
	const { register, handleSubmit } = useForm();

	useEffect(() => {
		const loadingProducts = async () => {
			try {
				const response = await axios.get(`${API_BASE}/api/${API_PATH}/products/all`)

				setProducts(response.data.products)
			} catch (error) {
				showMsg("網站出錯請重新整理網頁", "error");
			}
		}
		productModalRef.current = new Modal('#productModal', {
			keyboard: false
		})
		loadingProducts()
	}, [])



	const openModel = () => {
		productModalRef.current.show();
	};

	const closeModel = () => {
		productModalRef.current.hide();
		setTempProduct({})
	};

	const onSubmit = async () => {
		setIsLoading(true);
		const data = {
			data: {
				product_id: tempProduct.id,
				qty: qty
			}
		}
		try {
			const response = await axios.post(`${API_BASE}/api/${API_PATH}/cart`, data)
			setCartTrigger(prev => prev + 1);
			showMsg(response.data.message, "success");
		} catch (error) {
			showMsg("網站出錯請重新整理網頁", "error");
			closeModel()
		} finally {
			setTimeout(() => {
				setIsLoading(false);
				closeModel();           // ← 移到這裡，等 2 秒再關
			}, 2000);
		}
	}

	return (<>
		<div className="row row-cols-1 row-cols-md-3 g-4 mt-2">
			{
				products.map((product) => (
					<div className="col" key={product.id}>
						<div className="card">
							<div className="card-img-wrapper">
								<img src={product.imageUrl} className="card-img-top" alt={product.title} />
							</div>
							<div className="card-body">
								<h5 className="card-title">{product.title}</h5>

								<p className="text-muted mb-2">
									售價：<del>{formatNumber(product.origin_price)}</del>
								</p>

								<p className="text-danger fw-bold mb-0">
									限時壓倒價：
								</p>
								<h5 className="text-danger fw-bold">
									NT$ {formatNumber(product.price)}
								</h5>



								<p className="card-text">{product.description.length > 50
									? product.description.slice(0, 50) + "..."
									: product.description}
								</p>
								<div className="btn-groups"><Link to={product.id} className="moreLink">查看更多</Link >
									<button className="moreLink btn btn-yellow" onClick={() => { openModel(), setTempProduct(product), setQty(1) }}>加入購物車</button></div>

							</div>

						</div>

					</div>

				))
			}





		</div>

		< div className="modal fade" id="productModal" tabIndex="-1" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="productModalLabel" aria-hidden="true" ref={productModalRef}>
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content border-0">
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="modal-header">
							<h5 className="modal-title" id="ModalLabel">加入購物車</h5>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>

						<div className="modal-body">
							<img src={tempProduct.imageUrl} className="card-img-top" alt={tempProduct.title} />
							<div className="btn-groups">
								<h5 >{tempProduct.title}</h5>

								<p className="text-muted mb-2 ">
									售價：<del>{formatNumber(tempProduct.origin_price)}</del>
								</p>
							</div>
							<h5 className="text-danger fw-bold mb-4">
								限時壓倒價：NT$ {formatNumber(tempProduct.price)}
							</h5>

							<p className="text-center">最多10個</p>
							<div className="btn-groups">

								<button type='button' className="btn-qty-modal btn-qty-remove" onClick={() => setQty(qty > 1 ? qty - 1 : 1)} disabled={qty == 1}> - </button>
								<input value={qty} className="form-control" {...register("qty")} />
								<button type='button' className="btn-qty-modal btn-qty-add" onClick={() => setQty(qty + 1)} disabled={qty >= 10}> + </button>
							</div>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-danger" data-bs-dismiss="modal">取消</button>
							<button type="submit" className="btn btn-yellow" disabled={isLoading}>
								{isLoading ? (
									<Hearts height="20" width="40" color="#ffffff" />
								) : (
									'加入購物車'
								)}
							</button>
						</div>
					</form>
				</div>
			</div >
		</div >



	</>
	)
}
export default Products