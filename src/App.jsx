import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./assets/style.css";
import * as bootstrap from "bootstrap";
import ProductModal from "./component/ProductModal";
import Loading from "./component/Loading";
import Footer from "./component/Footer";
import Pagination from "./component/Pagination";



//引入env設置
const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

let errorTimer;

const initialProduct = {
  id: "",
  title: "",
  category: "",
  origin_price: "",
  price: "",
  unit: "",
  description: "",
  content: "",
  is_enabled: false,
  imageUrl: "",
  imagesUrl: [],
  evaluate: ""
}


// 登入欄位的資料預設值
const initialFormData = {
  username: '',
  password: ''
}

function App() {
  const [formData, setFormData] = useState(initialFormData);
  const [isAuth, setIsAuth] = useState(false);
  const [hasLoginMessage, setHasLoginMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [products, setProducts] = useState([]);
  const [tempProduct, setTempProduct] = useState(initialProduct);
  const [modalType, setModalType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({});

  const productModalRef = useRef(null);


  const showError = (message) => {
    clearTimeout(errorTimer);
    setErrorMessage(message);

    errorTimer = setTimeout(() => {
      setErrorMessage("");
    }, 2000);
  };

  //重新整理時確認是否登入API

  useEffect(() => {
    // 讀取 Cookie
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("hexToken="))
      ?.split("=")[1];
    // 確認有token 轉往確認登入
    if (token) {
      axios.defaults.headers.common['Authorization'] = token;

    }
    productModalRef.current = new bootstrap.Modal('#productModal', {
      keyboard: false
    })
    checkLogin();
  }, []
  )


  const openModel = (type, product) => {

    setModalType(type)
    setTempProduct((pre) => ({
      ...pre,
      ...product,
    }));
    productModalRef.current.show();
  }

  const closeModel = () => {
    productModalRef.current.hide()
    setTempProduct(initialProduct);
  }

  useEffect(() => {
    if (!tempProduct.imagesUrl || tempProduct.imagesUrl.length === 0) {
      setTempProduct(pre => ({
        ...pre,
        imagesUrl: ['']
      }));
    }

  }, [openModel])

  // 按下按鈕後登入
  const onSubmit = async (e) => {
    e.preventDefault()
    setHasLoginMessage('執行登入中...請稍後');
    try {
      const response = await axios.post(`${API_BASE}/admin/signin`, formData);
      // 取得token, expired 寫入 cookie 以及axios headers 
      const { token, expired } = response.data;
      document.cookie = `hexToken=${token};expires=${new Date(expired)};`;
      axios.defaults.headers.common['Authorization'] = token;
      //登入後轉往確認登入
      checkLogin();
    } catch (error) {
      setHasLoginMessage(error.response.data.message);
    }
  }

  //確認是否登入狀態
  const checkLogin = async () => {
    try {
      const response = await axios.post(`${API_BASE}/api/user/check`);
      setIsAuth(true);
      getProducts();
    } catch (error) {
      checkLogout();
    }
  }
  // 登出
  const checkLogout = async () => {
    try {
      const response = await axios.post(`${API_BASE}/logout`);
      setFormData(initialFormData);
      setIsAuth(false);
      setProducts([]);
    } catch (error) {
      setHasLoginMessage('請輸入帳號密碼進行登入');
    }
  }


  const getProducts = async (page = 1, category = '') => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE}/api/${API_PATH}/admin/products`, {
        params: {
          page,
          category,
        },
      });
      setTempProduct(initialProduct);
      setProducts(response.data.products);
      setPagination(response.data.pagination);
    } catch (error) {
      showError(error.response)
    } finally {
      setIsLoading(false);
    }
  }

  const upLoadImage = async (e) => {
    const file = e.target.files?.[0]
    if (!file) {
      return;
    }

    try {
      const formData = new FormData()
      formData.append('file-to-upload', file)

      const response = await axios.post(`${API_BASE}/api/${API_PATH}/admin/upload`, formData)
      setTempProduct((pre) => ({
        ...pre,
        imageUrl: response.data.imageUrl
      }))

    } catch (error) {
      console.log(error.response)
    }




  };




  const updateProduct = async (id) => {
    setIsLoading(true);
    let url = `${API_BASE}/api/${API_PATH}/admin/product`
    let method = 'post'
    let page = 1

    if (modalType === 'edit') {
      url = `${API_BASE}/api/${API_PATH}/admin/product/${id}`
      method = 'put'
      page = pagination.current_page
    }

    const productData = {
      data: {
        ...tempProduct,
        origin_price: tempProduct.origin_price * 1,
        price: tempProduct.price * 1,
        is_enabled: tempProduct.is_enabled ? 1 : 0,
        imagesUrl: [...tempProduct.imagesUrl.filter((url) => url !== "")]
      }
    }

    try {
      const response = await axios[method](url, productData);
      showError(response.data.message);
      getProducts(page);
      closeModel();
    } catch (error) {
      showError(error.response.data.message)

    } finally {
      setIsLoading(false);
    }
  }


  const deleteProduct = async (id) => {
    setIsLoading(true);
    try {
      const response = await axios.delete(`${API_BASE}/api/${API_PATH}/admin/product/${id}`);
      showError(response.data.message);
      getProducts();
      closeModel();
    } catch (error) {
      showError(error.response.data.message)

    } finally {
      setIsLoading(false);
    }

  }


  const copyProduct = async () => {
    setIsLoading(true);

    const productData = {
      data: {
        ...tempProduct,
        origin_price: tempProduct.origin_price * 1,
        price: tempProduct.price * 1,
        is_enabled: tempProduct.is_enabled ? 1 : 0,
        imagesUrl: [...tempProduct.imagesUrl.filter((url) => url !== "")]
      }
    }

    try {
      const response = await axios.post(`${API_BASE}/api/${API_PATH}/admin/product`, productData);
      showError(response.data.message);
      getProducts();
      closeModel();
    } catch (error) {
      showError(error.response.data.message)

    } finally {
      setIsLoading(false);
    }
  }




  //取的輸入更新值存入formData
  //先取值 用解構
  //寫入setFormData() 帶入原本的值...展開 再取代相對的位置
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((pre) => ({
      ...pre,
      [name]: value
    }))
  }

  const productInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    setTempProduct((pre) => ({
      ...pre,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  // 針對imagesUrl 的輸入取值
  const productImageChange = (index, value) => {
    setTempProduct((pre) => {
      const newImages = [...pre.imagesUrl]
      newImages[index] = value
      return {
        ...pre,
        imagesUrl: newImages
      }
    })
  }

  const addImage = () => {
    setTempProduct((pre) => {
      const newImages = [...pre.imagesUrl];
      newImages.push('');
      return {
        ...pre,
        imagesUrl: newImages
      }
    })

  }

  const removeImage = () => {
    setTempProduct((pre) => {
      const newImages = [...pre.imagesUrl];
      newImages.pop();
      return {
        ...pre,
        imagesUrl: newImages
      }
    })

  }


  const chengePage = (e) => {
    getProducts(e.page);
  }

  return (
    <>
      {!isAuth ? (<div className="container login">
        <div className="row justify-content-center">
          <h1 className="h3 mb-3 font-weight-normal">請先登入</h1 >
          <div className="col-8">
            <form id="form" className="form-signin" onSubmit={onSubmit}>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  name="username"
                  placeholder="name@example.com"
                  value={formData.username}
                  onChange={(e) => handleInputChange(e)}
                  required
                  autoFocus
                />
                <label htmlFor="username">Email address</label>
              </div>
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => handleInputChange(e)}
                  required
                />
                <label htmlFor="password">Password</label>
              </div>
              <div className="text-danger mt-3" >{hasLoginMessage}</div>
              <button
                className="btn btn-lg btn-primary w-100 mt-3"
                type="submit"
              >
                登入
              </button>
            </form>
          </div>
        </div >
        <Footer />
      </div >) : (
        <div className='container'>
          <div className='row'>
            <div className="col-2 text-start">
              <button className="btn btn-warning text-light mt-3" type="button" onClick={() => checkLogout()}>登出</button>
            </div>
            <div className="col-8">
              <div
                className={`bg-warning mt-3 py-2 px-3 shadow-sm ${errorMessage ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  transition: 'opacity 0.5s ease-in-out',
                }}
              >
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                {errorMessage}
              </div>
            </div>
            <div className="col-2 text-end">
              <button className="btn btn-info text-light mt-3" type="button" onClick={() => openModel('create', initialProduct)}>新增商品</button>
            </div>
          </div>



          <div className="row mt-2">

            <h2 className="fw-bold">產品列表</h2>
            <table className="table align-middle">
              <thead>
                <tr>
                  <th scope="col">分類</th>
                  <th scope="col">產品名稱</th>
                  <th scope="col">商品評價</th>
                  <th scope="col" className="text-end">原價</th>
                  <th scope="col" className="text-end">售價</th>
                  <th scope="col" className="text-center">是否啟用</th>
                  <th scope="col" className="text-center">操作</th>
                </tr>
              </thead>
              <tbody>
                {products.map((item) => (
                  <tr key={item.id}>
                    <td>{item.category}</td>
                    <td>{item.title}</td>
                    <td>{item.evaluate}</td>
                    <td className="text-end">{item.origin_price}</td>
                    <td className="text-end">{item.price}</td>
                    <td className="text-center">
                      {/* 改用 span 並利用標籤顏色更顯眼 */}
                      <span className={item.is_enabled ? 'text-primary fw-bold' : 'text-secondary'}>
                        {item.is_enabled ? "已啟用" : "未啟用"}
                      </span>
                    </td>
                    <td className="text-center">
                      <div className="btn-group btn-group-sm" role="group"> {/* 小尺寸按鈕在表格裡比較精緻 */}
                        <button
                          type="button"
                          className="btn btn-outline-primary" // 用外框線按鈕看起來更輕盈
                          onClick={() => openModel('edit', item)}
                        >
                          編輯
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() => openModel('delete', item)}
                        >
                          刪除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Pagination pagination={pagination} chengePage={chengePage} />


          </div>
          <Footer />
        </div >


      )}


      <ProductModal modalType={modalType}
        tempProduct={tempProduct}
        productModalRef={productModalRef}
        closeModel={closeModel}
        updateProduct={updateProduct}
        deleteProduct={deleteProduct}
        copyProduct={copyProduct}
        productInputChange={productInputChange}
        productImageChange={productImageChange}
        addImage={addImage}
        removeImage={removeImage}
        upLoadImage={upLoadImage} />

      <Loading isLoading={isLoading} />

    </>


  )
}

export default App