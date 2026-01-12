import { useState } from 'react';
import axios from 'axios';


//引入env設置
const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

// 登入欄位的資料預設值
  const initialFormData = {
    username: '',
    password: ''
  }

function App() {
  /////////////////////////////////////////////// 狀態區塊
  // 處理登入欄位的資料
  const [formData, setFormData] = useState(initialFormData);

  //處理登入狀態的判斷
  const [isAuth, setIsAuth] = useState(false);

  // 處理登入時是否錯誤提示
  const [hasLoginError, setHasLoginError] = useState(false);

  // 確認是否登入狀態查詢
  const [hasCheckLogin, setHasCheckLogin] = useState(false);

  //week1 的範例套入
  const [mainImage, setMainImage] = useState("");
  const [tempProduct, setTempProduct] = useState(null);

  //初始產品列表及建立產品資料位置
  const [products, setProducts] = useState([]);

  //同時更新查看細節 及 主圖狀態
  const viewDetail = (item) => {
    setTempProduct(item);
    setMainImage(item.imageUrl);
  };

  //接收欄位資訊的寫入及儲存
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setFormData((preData) => ({
      ...preData,
      [name]: value,
    }))
  }

  /////////////////////////////////////////////// API區塊設定

  //按鈕送出後的登入API串接
  const onSubmit = async (e) => {
    setHasLoginError(false);
    e.preventDefault();
    try {
      //API 串 /admin/signin
      const response = await axios.post(`${API_BASE}/admin/signin`, formData);
      // console.log(response.data);

      // 取得token, expired 寫入 cookie 以及axios headers 
      const { token, expired } = response.data;
      document.cookie = `hexToken=${token};expires=${new Date(expired)};`;
      axios.defaults.headers.common['Authorization'] = token;

      // 更改setIsAuth 狀態
      setIsAuth(true);
      getProducts();

    } catch (error) {
     
      setFormData(initialFormData);
      setHasLoginError(true);
      setIsAuth(false);
    }
  }

  //確認是否登入API
  const checkLogin = async () => {
    try {
      // 讀取 Cookie
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("hexToken="))
        ?.split("=")[1];

      const response = await axios.post(`${API_BASE}/api/user/check`);
      setHasCheckLogin(true);
      // console.log(response.data);
    } catch (error) {
      console.log(error.response?.data.message)
    }
  }

  //登出API
  const checkLogout = async () => {
    try {
    
      const response = await axios.post(`${API_BASE}/logout`);
      setHasCheckLogin(false);
      setIsAuth(false);
    } catch (error) {
      console.log(error.response)
    }
  }


  //取得產品個別API
  const getProducts = async () => {
    //API 串 /admin/signin
    try {
      
      const response = await axios.get(`${API_BASE}/api/${API_PATH}/admin/products`);
      setProducts(response.data.products);
      
    } catch (error) {
      console.log(error.response)
    }
  }

 


  return (
    <>
      
      {
        !isAuth ? (
          <div className='container login d-flex flex-column justify-content-center align-items-center vh-100'>
            <div className='w-25 p-5 container border border-2 border-warning rounded-3 bg-warning-subtle bg-opacity-10  ' >
              <h1 className='text-warning text-center'>後台登入</h1>
              <form className="form-floating" onSubmit={onSubmit}>
                <div className="form-floating mt-3">
                  <input type="email" className="form-control" id="username" name="username" autoComplete="username" placeholder="name@example.com" value={formData.username} onChange={(e) => handleInputChange(e)}
                  />
                  <label htmlFor="username">Email address</label>
                </div>
                <div className="form-floating mt-3">
                  <input type="password" className="form-control" id="password" name="password" placeholder="Password" value={formData.password} onChange={(e) => handleInputChange(e)}
                  />
                  <label htmlFor="password">Password</label>
                </div>
                {hasLoginError && (
                  <div className="invalid-feedback d-block text-center mt-2">
                    請輸入正確 e-mail 及 密碼
                  </div>
                )}
                <button type="submit" className="btn btn-warning my-3 text-light fw-bold w-100" >登入</button>
              </form>
            </div>
            <div name="footer" className='text-center mt-3' >
              本網站為六角學院教學成果展示用，內容皆為模擬非真實資訊，內容請勿轉載。
            </div>
          </div>
        ) : (
          <div className='container'>
                {!hasCheckLogin ? (
             
              <button
              className="btn btn-danger text-light mt-3"
              type="button"
              onClick={()=> checkLogin()}
            >確認是否登入</button>) : (<button
              className="btn btn-warning text-light mt-3"
              type="button"
              onClick={()=> checkLogout()}
            >確認登入中(登出)</button>)}
              
             
              
            <div className="row mt-2">
              <div className="col-md-6">
                <h2 className="fw-bold">產品列表</h2>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">產品名稱</th>
                      <th scope="col">原價</th>
                      <th scope="col">售價</th>
                      <th scope="col">是否啟用</th>
                      <th scope="col">查看細節</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((item) => (
                      <tr key={item.id}>
                        <th scope="row">{item.title}</th>
                        <td>{item.origin_price}</td>
                        <td>{item.price}</td>
                        <td>{item.is_enabled ? "已啟用" : "未啟用"}</td>
                        <td>
                          <button
                            className="btn btn-success"
                            onClick={() => viewDetail(item)}
                          >
                            點我看詳細
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="col-md-6">
                <h2 className="fw-bold">產品詳細簡介</h2>
                {tempProduct ? (
                  <div className="card">
                    <img src={mainImage} style={{ width: "100%" }} alt="主圖" />
                    <div className="card-body">
                      <h5 className="card-title fw-bold">{tempProduct.title}</h5>
                      <span className="badge bg-danger ms-2">
                        {tempProduct.category}
                      </span>
                      <p className="card-text">商品描述：{tempProduct.description}</p>
                      <p className="card-text">{tempProduct.content}</p>
                      <p className="card-text">
                        商品價格：
                        <del className="text-secondary">
                          {tempProduct.origin_price} 元
                        </del>{" "}
                        / {tempProduct.price} 元
                      </p>
                      <h5 className="card-title fw-bold">更多圖片：</h5>
                      <div className="d-flex flex-wrap">
                        {tempProduct.imagesUrl.map((url, index) => (
                          <img
                            key={index}
                            src={url}
                            style={{ height: "120px", marginRight: "5px" }}
                            onClick={() => setMainImage(url)}
                            alt="其他圖片"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  "請點選想看的商品"
                )}
              </div>
              </div>
              <div name="footer" className='text-center mt-3' >
              本網站為六角學院教學成果展示用，內容皆為模擬非真實資訊，內容請勿轉載。
            </div>
          </div>


        )
      }
      
    </>


  )
}

export default App
