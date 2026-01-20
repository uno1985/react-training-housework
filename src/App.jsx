
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./assets/style.css";
import * as bootstrap from "bootstrap";


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
      products([]);
    } catch (error) {
      setHasLoginMessage('請輸入帳號密碼進行登入');
    }
  }


  const getProducts = async () => {
    setIsLoading(true);
    try {

      const response = await axios.get(`${API_BASE}/api/${API_PATH}/admin/products`);
      setProducts(response.data.products);


    } catch (error) {
      showError(error.response)
    } finally {
      setIsLoading(false);
    }
  }





  const updataProduct = async (id) => {
    setIsLoading(true);
    let url = `${API_BASE}/api/${API_PATH}/admin/product`
    let method = 'post'

    if (modalType === 'edit') {
      url = `${API_BASE}/api/${API_PATH}/admin/product/${id}`
      method = 'put'
    }
    if (modalType === 'delete') {
      url = `${API_BASE}/api/${API_PATH}/admin/product/${id}`
      method = 'delete'
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
        <p className="mt-5 mb-3 text-muted">本網站為六角學院教學成果展示用，內容皆為模擬非真實資訊，內容請勿轉載。</p>
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
            <table className="table align-middle"> {/* align-middle 讓全列內容垂直置中 */}
              <thead>
                <tr>
                  <th scope="col">分類</th>
                  <th scope="col">產品名稱</th>
                  <th scope="col" className="text-end">原價</th>
                  <th scope="col" className="text-end">售價</th>
                  <th scope="col" className="text-center">是否啟用</th> {/* 狀態置中較好看 */}
                  <th scope="col" className="text-center">操作</th>
                </tr>
              </thead>
              <tbody>
                {products.map((item) => (
                  <tr key={item.id}>
                    <td>{item.category}</td>
                    <td>{item.title}</td>
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



          </div>
          <div name="footer" className='text-center mt-3' >
            本網站為六角學院教學成果展示用，內容皆為模擬非真實資訊，內容請勿轉載。
          </div>
        </div >


      )}
      < div className="modal fade" id="productModal" tabIndex="-1" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="productModalLabel" aria-hidden="true" ref={productModalRef}>
        <div className="modal-dialog modal-xl">
          <div className="modal-content border-0">
            <div className={`modal-header bg-${modalType === 'delete' ? 'danger' : 'dark'} text-white`}>
              <h5 id="productModalLabel" className="modal-title">
                <span>{modalType === 'delete' ? '刪除' : (modalType === 'edit' ? '編輯' : '新增')}產品</span>
              </h5>
              <button
                type="button"
                className="btn-close btn-white"
                data-bs-dismiss="modal"
                aria-label="Close"

              ></button>
            </div>


            <div className="modal-body">
              {
                modalType === 'delete' ? (<p className="fs-4">
                  確定要刪除
                  <span className="text-danger">{tempProduct.title}</span>嗎？
                </p>) : (
                  <div className="row  text-start">
                    <div className="col-sm-4">
                      <div className="mb-2">
                        <div className="mb-3">
                          <label htmlFor="imageUrl" className="form-label">
                            輸入主要圖片網址
                          </label>
                          <input
                            type="text"
                            id="imageUrl"
                            name="imageUrl"
                            className="form-control"
                            placeholder="請輸入圖片連結"
                            value={tempProduct.imageUrl}
                            onChange={(e) => productInputChange(e)}
                          />
                        </div>
                        {
                          tempProduct.imageUrl && (
                            <img className="img-fluid" src={tempProduct.imageUrl} alt="主圖" />
                          )
                        }

                      </div>
                      <div>

                        {
                          tempProduct.imagesUrl.map((url, index) =>
                          (
                            <div key={index}>
                              <label htmlFor="imageUrl" className="form-label">
                                輸入圖片網址
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={url}
                                placeholder={`圖片網址${index + 1}`}
                                onChange={(e) => productImageChange(index, e.target.value)}
                              />
                              {
                                url && <img
                                  className="img-fluid"
                                  src={url}
                                  alt={`副圖${index + 1}`}
                                />
                              }

                            </div>
                          ))
                        }
                        {
                          tempProduct.imagesUrl.length < 5 &&
                          <button className="btn btn-outline-primary btn-sm d-block w-100" onClick={() => addImage()}>
                            新增圖片
                          </button>
                        }


                      </div>
                      <div>
                        {
                          tempProduct.imagesUrl.length > 1 &&
                          <button className="btn btn-outline-danger btn-sm d-block w-100" onClick={() => removeImage()}>
                            刪除圖片
                          </button>
                        }

                      </div>
                    </div>
                    <div className="col-sm-8 ">
                      <div className="mb-3">
                        <label htmlFor="title" className="form-label">標題</label>
                        <input
                          name="title"
                          id="title"
                          type="text"
                          className="form-control"
                          placeholder="請輸入標題"
                          value={tempProduct.title}
                          onChange={(e) => productInputChange(e)}
                        />
                      </div>

                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label htmlFor="category" className="form-label">分類</label>
                          <input
                            name="category"
                            id="category"
                            type="text"
                            className="form-control"
                            placeholder="請輸入分類"
                            value={tempProduct.category}
                            onChange={(e) => productInputChange(e)}
                          />
                        </div>
                        <div className="mb-3 col-md-6">
                          <label htmlFor="unit" className="form-label">單位</label>
                          <input
                            name="unit"
                            id="unit"
                            type="text"
                            className="form-control"
                            placeholder="請輸入單位"
                            value={tempProduct.unit}
                            onChange={(e) => productInputChange(e)}
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label htmlFor="origin_price" className="form-label">原價</label>
                          <input
                            name="origin_price"
                            id="origin_price"
                            type="number"
                            min="0"
                            className="form-control"
                            placeholder="請輸入原價"
                            value={tempProduct.origin_price}
                            onChange={(e) => productInputChange(e)}
                          />
                        </div>
                        <div className="mb-3 col-md-6">
                          <label htmlFor="price" className="form-label">售價</label>
                          <input
                            name="price"
                            id="price"
                            type="number"
                            min="0"
                            className="form-control"
                            placeholder="請輸入售價"
                            value={tempProduct.price}
                            onChange={(e) => productInputChange(e)}
                          />
                        </div>
                      </div>
                      <hr />

                      <div className="mb-3">
                        <label htmlFor="description" className="form-label">產品描述</label>
                        <textarea
                          name="description"
                          id="description"
                          className="form-control"
                          placeholder="請輸入產品描述"
                          value={tempProduct.description}
                          onChange={(e) => productInputChange(e)}
                        ></textarea>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="content" className="form-label">說明內容</label>
                        <textarea
                          name="content"
                          id="content"
                          className="form-control"
                          placeholder="請輸入說明內容"
                          value={tempProduct.content}
                          onChange={(e) => productInputChange(e)}
                        ></textarea>
                      </div>
                      <div className="mb-3">
                        <div className="form-check">
                          <input
                            name="is_enabled"
                            id="is_enabled"
                            className="form-check-input"
                            type="checkbox"
                            checked={tempProduct.is_enabled}
                            onChange={(e) => productInputChange(e)}

                          />
                          <label className="form-check-label" htmlFor="is_enabled">
                            是否啟用
                          </label>
                        </div>
                      </div>
                    </div>
                  </div >
                )
              }


            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary"
                data-bs-dismiss="modal"
                onClick={() => closeModel()}
              >
                取消
              </button>
              {
                modalType === 'delete' ? (<button type="button" className="btn btn-danger" onClick={() => updataProduct(tempProduct.id)} >刪除</button>) : (<button type="button" className="btn btn-primary" onClick={() => updataProduct(tempProduct.id)} >確認</button>)
              }

            </div>
          </div>
        </div>
      </div>

      {
        isLoading && <div
          className="position-fixed top-0 start-0 w-100 vh-100 d-flex justify-content-center align-items-center bg-warning"
          style={{ zIndex: 9999 }}
        >
          <div className="text-center">
            <div className="spinner-border text-dark" role="status"></div>
            <h2 className="mt-2">處理中，請稍候...</h2>
          </div>
        </div>
      }



    </>


  )
}



export default App