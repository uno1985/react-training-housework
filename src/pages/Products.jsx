import axios from "axios";
import { useEffect, useState } from "react";
import '../styles/products.css'
import { Link } from "react-router";
import { useMsg } from "../context/MsgContext";
//引入env設置
const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;





const Products = () => {
	const { showMsg } = useMsg();
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const loadingProducts = async () => {
			try {
				const response = await axios.get(`${API_BASE}/api/${API_PATH}/products/all`)

				setProducts(response.data.products)
			} catch (error) {
				showMsg("網站出錯請重新整理網頁", "error");
			}
		}
		loadingProducts()
	}, [])


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
								<p className="card-text">{product.description.length > 50
									? product.description.slice(0, 50) + "..."
									: product.description}
								</p>

								<Link to={product.id} className="moreLink">查看更多</Link >
							</div>

						</div>

					</div>

				))
			}





		</div></>
	)
}
export default Products