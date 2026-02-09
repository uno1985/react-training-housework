import { useEffect } from 'react'
import { useLocation, Link } from 'react-router'

import '../styles/service.css'

const Service = () => {
    const location = useLocation()

    // 錨點滾動
    useEffect(() => {
        if (location.hash) {
            const el = document.querySelector(location.hash)
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' })
            }
        } else {
            window.scrollTo(0, 0)
        }
    }, [location.hash])

    return (
        <>
            {/* ====== HERO ====== */}
            <section className="service-hero">
                <h1>顧客服務</h1>
                <p>任何問題，我們都在這裡為你解答</p>
            </section>

            {/* ====== 快速跳轉 ====== */}
            <nav className="service-nav">
                <div className="container">
                    <Link to="/service#faq">常見問題</Link>
                    <Link to="/service#returns">退換貨政策</Link>
                    <Link to="/service#privacy">隱私權政策</Link>
                    <Link to="/service#contact">聯絡我們</Link>
                </div>
            </nav>

            {/* ====== FAQ 常見問題 ====== */}
            <section id="faq" className="service-section">
                <div className="container">
                    <span className="service-label">FAQ</span>
                    <h2>常見問題</h2>

                    <div className="accordion" id="faqAccordion">
                        <div className="accordion-item">
                            <h3 className="accordion-header">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                                    如何追蹤我的訂單？
                                </button>
                            </h3>
                            <div id="faq1" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                                <div className="accordion-body">
                                    訂單成立後，您會收到一封確認信，內含訂單編號。
                                    登入會員中心即可查看物流進度，商品出貨後也會以 Email 通知您物流追蹤編號。
                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h3 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                                    可以使用哪些付款方式？
                                </button>
                            </h3>
                            <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                <div className="accordion-body">
                                    我們支援信用卡（Visa / Mastercard / JCB）、LINE Pay、超商代碼繳費，
                                    以及銀行轉帳（ATM）。所有交易皆透過 SSL 加密，確保您的付款安全。
                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h3 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                                    商品多久會到貨？
                                </button>
                            </h3>
                            <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                <div className="accordion-body">
                                    一般商品於訂單成立後 1-3 個工作日內出貨，宅配約 1-2 天送達、
                                    超商取貨約 2-4 天。預購商品或客製化商品會在商品頁面註明預計出貨時間。
                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h3 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq4">
                                    可以修改或取消訂單嗎？
                                </button>
                            </h3>
                            <div id="faq4" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                <div className="accordion-body">
                                    訂單成立後 30 分鐘內可透過會員中心自行取消。超過此時間或已出貨的訂單，
                                    請聯繫客服團隊協助處理。修改訂單（如更換尺寸、顏色）需在出貨前提出。
                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h3 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq5">
                                    有提供禮物包裝服務嗎？
                                </button>
                            </h3>
                            <div id="faq5" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                <div className="accordion-body">
                                    有的！結帳時可選擇「禮物包裝」服務（加購 NT$60），我們會以 UNOS 品牌禮盒搭配緞帶包裝，
                                    並可附上您的祝福小卡。非常適合送禮使用。
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ====== 退換貨政策 ====== */}
            <section id="returns" className="service-section bg-alt">
                <div className="container">
                    <span className="service-label">RETURN POLICY</span>
                    <h2>退換貨政策</h2>

                    <div className="policy-grid">
                        <div className="policy-card">
                            <div className="policy-number">01</div>
                            <h4>七天鑑賞期</h4>
                            <p>
                                依照消費者保護法規定，您享有商品到貨後七天的猶豫期（非試用期）。
                                如商品未經拆封使用且保持完整包裝，即可申請退貨。
                            </p>
                        </div>
                        <div className="policy-card">
                            <div className="policy-number">02</div>
                            <h4>退貨流程</h4>
                            <p>
                                請透過會員中心提交退貨申請，客服審核通過後會寄送退貨單。
                                將商品連同退貨單、原始包裝一併寄回，我們收到後 3-5 個工作日內完成退款。
                            </p>
                        </div>
                        <div className="policy-card">
                            <div className="policy-number">03</div>
                            <h4>換貨說明</h4>
                            <p>
                                如需更換尺寸或顏色，請先申請退貨再重新下單，以確保您能最快收到正確商品。
                                若收到瑕疵品，換貨運費由 UNOS 全額負擔。
                            </p>
                        </div>
                        <div className="policy-card">
                            <div className="policy-number">04</div>
                            <h4>不適用退換貨</h4>
                            <p>
                                以下情形恕不接受退換貨：已拆封使用之個人衛生用品、客製化商品、
                                特價出清商品，以及超過七天鑑賞期之商品。
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ====== 隱私權政策 ====== */}
            <section id="privacy" className="service-section">
                <div className="container">
                    <span className="service-label">PRIVACY POLICY</span>
                    <h2>隱私權政策</h2>

                    <div className="privacy-content">
                        <div className="privacy-block">
                            <h4>資料蒐集</h4>
                            <p>
                                我們僅蒐集完成交易及提供服務所必要的個人資訊，包括：姓名、Email、電話、
                                收件地址及付款資訊。您的資料僅用於訂單處理、物流配送及客戶服務，
                                絕不會提供給無關的第三方。
                            </p>
                        </div>

                        <div className="privacy-block">
                            <h4>資料保護</h4>
                            <p>
                                所有個人資料皆以 SSL 256-bit 加密傳輸與儲存。我們採用業界標準的資安措施，
                                包括防火牆、存取控制及定期安全稽核，確保您的資料安全無虞。
                            </p>
                        </div>

                        <div className="privacy-block">
                            <h4>Cookie 使用</h4>
                            <p>
                                本網站使用 Cookie 來改善您的瀏覽體驗，包括記住登入狀態、購物車內容，
                                以及分析網站流量。您可以隨時透過瀏覽器設定停用 Cookie，
                                但部分功能可能因此受到影響。
                            </p>
                        </div>

                        <div className="privacy-block">
                            <h4>您的權利</h4>
                            <p>
                                您有權查詢、更正或刪除您的個人資料。如需行使上述權利，
                                請透過下方聯絡方式與我們聯繫，我們將於收到請求後 30 日內回覆處理。
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ====== 聯絡我們 ====== */}
            <section id="contact" className="service-section bg-alt">
                <div className="container">
                    <span className="service-label">CONTACT US</span>
                    <h2>聯絡我們</h2>

                    <div className="row gy-5">
                        <div className="col-lg-5">
                            <div className="contact-info">
                                <div className="contact-item">
                                    <div className="contact-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                                            <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h5>門市地址</h5>
                                        <p>台北市大安區敦化南路一段 100 號</p>
                                    </div>
                                </div>

                                <div className="contact-item">
                                    <div className="contact-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h5>Email</h5>
                                        <p>hello@unos-shop.com</p>
                                    </div>
                                </div>

                                <div className="contact-item">
                                    <div className="contact-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h5>客服電話</h5>
                                        <p>(02) 2700-1234</p>
                                        <span className="contact-note">週一至週五 10:00 - 18:00</span>
                                    </div>
                                </div>

                                <div className="contact-item">
                                    <div className="contact-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1H8a.5.5 0 0 1-.5-.5v-3.5A.5.5 0 0 1 8 4" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h5>營業時間</h5>
                                        <p>每日 11:00 - 21:00</p>
                                        <span className="contact-note">國定假日照常營業</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6 offset-lg-1">
                            <form className="contact-form">
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label">姓名</label>
                                        <input type="text" className="form-control" placeholder="請輸入姓名" />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Email</label>
                                        <input type="email" className="form-control" placeholder="name@example.com" />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label">主旨</label>
                                        <select className="form-select">
                                            <option value="">請選擇問題類型</option>
                                            <option>訂單查詢</option>
                                            <option>退換貨申請</option>
                                            <option>商品諮詢</option>
                                            <option>合作提案</option>
                                            <option>其他</option>
                                        </select>
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label">訊息內容</label>
                                        <textarea className="form-control" rows="5" placeholder="請描述您的問題或需求..."></textarea>
                                    </div>
                                    <div className="col-12">
                                        <button type="submit" className="btn btn-yellow w-100 py-2">
                                            送出訊息
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Service