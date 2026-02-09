import '../styles/about.css'

const About = () => {
    return (
        <>
            {/* ====== HERO BANNER ====== */}
            <section className="about-hero">
                <h1>Our Story</h1>
                <p>剛剛好的美好，從理解生活開始</p>
            </section>

            {/* ====== 品牌理念 ====== */}
            <section className="about-philosophy">
                <div className="container">
                    <div className="row align-items-center gy-5">
                        <div className="col-lg-6">
                            <img
                                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace"
                                alt="UNOS 品牌理念"
                                className="about-img"
                            />
                        </div>
                        <div className="col-lg-5 offset-lg-1">
                            <span className="about-label">PHILOSOPHY</span>
                            <h2>不追求最多，<br />只留下最好</h2>
                            <p>
                                UNOS 創立於對生活細節的在意。我們相信，真正的質感不在於擁有多少，
                                而是每一件物品是否都值得被好好使用。
                            </p>
                            <p>
                                從一只杯子到一盞檯燈，我們花時間理解材質、比例與使用時的手感，
                                只挑選那些能在日常中長久陪伴你的設計。
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ====== 數據亮點 ====== */}
            <section className="about-stats">
                <div className="container">
                    <div className="row text-center">
                        <div className="col-6 col-md-3">
                            <div className="stat-number">2020</div>
                            <div className="stat-desc">品牌創立</div>
                        </div>
                        <div className="col-6 col-md-3">
                            <div className="stat-number">500+</div>
                            <div className="stat-desc">精選商品</div>
                        </div>
                        <div className="col-6 col-md-3">
                            <div className="stat-number">12,000+</div>
                            <div className="stat-desc">滿意顧客</div>
                        </div>
                        <div className="col-6 col-md-3">
                            <div className="stat-number">98%</div>
                            <div className="stat-desc">好評回購率</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ====== 品牌價值 ====== */}
            <section className="about-values">
                <div className="container">
                    <div className="text-center mb-5">
                        <span className="about-label">OUR VALUES</span>
                        <h2>我們堅持的三件事</h2>
                    </div>
                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="value-card">
                                <div className="value-icon">01</div>
                                <h3>嚴選品質</h3>
                                <p>
                                    每件商品經過至少三輪篩選，從材質、工藝到實際使用體驗，
                                    只有通過所有標準的產品才會上架。
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="value-card">
                                <div className="value-icon">02</div>
                                <h3>設計思維</h3>
                                <p>
                                    我們與全球超過 30 位獨立設計師合作，
                                    每一件商品都承載著對生活的獨特觀點與美學堅持。
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="value-card">
                                <div className="value-icon">03</div>
                                <h3>永續理念</h3>
                                <p>
                                    選擇能長久使用的物件，本身就是一種永續。
                                    我們優先採用環保材質，減少不必要的包裝浪費。
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ====== 團隊介紹 ====== */}
            <section className="about-team">
                <div className="container">
                    <div className="text-center mb-5">
                        <span className="about-label">THE TEAM</span>
                        <h2>認識我們的團隊</h2>
                    </div>
                    <div className="row g-4 justify-content-center">
                        <div className="col-6 col-md-3">
                            <div className="team-card">
                                <img
                                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a"
                                    alt="陳柏翰"
                                    className="team-img"
                                />
                                <h4>陳柏翰</h4>
                                <span>創辦人 / CEO</span>
                            </div>
                        </div>
                        <div className="col-6 col-md-3">
                            <div className="team-card">
                                <img
                                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2"
                                    alt="林雅琪"
                                    className="team-img"
                                />
                                <h4>林雅琪</h4>
                                <span>設計總監</span>
                            </div>
                        </div>
                        <div className="col-6 col-md-3">
                            <div className="team-card">
                                <img
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                                    alt="王建志"
                                    className="team-img"
                                />
                                <h4>王建志</h4>
                                <span>商品開發</span>
                            </div>
                        </div>
                        <div className="col-6 col-md-3">
                            <div className="team-card">
                                <img
                                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956"
                                    alt="張詩涵"
                                    className="team-img"
                                />
                                <h4>張詩涵</h4>
                                <span>行銷企劃</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ====== 時間軸 ====== */}
            <section className="about-timeline">
                <div className="container">
                    <div className="text-center mb-5">
                        <span className="about-label">MILESTONES</span>
                        <h2>品牌歷程</h2>
                    </div>
                    <div className="timeline">
                        <div className="timeline-item">
                            <div className="timeline-year">2020</div>
                            <div className="timeline-content">
                                <h4>品牌誕生</h4>
                                <p>從一間小公寓開始，以「剛剛好的美好」為理念，精選 50 件商品上線。</p>
                            </div>
                        </div>
                        <div className="timeline-item">
                            <div className="timeline-year">2021</div>
                            <div className="timeline-content">
                                <h4>突破千人</h4>
                                <p>會員數突破 1,000 人，與第一位日本設計師展開獨家合作。</p>
                            </div>
                        </div>
                        <div className="timeline-item">
                            <div className="timeline-year">2023</div>
                            <div className="timeline-content">
                                <h4>實體快閃</h4>
                                <p>首次舉辦實體快閃店，三天吸引超過 2,000 人到場體驗。</p>
                            </div>
                        </div>
                        <div className="timeline-item">
                            <div className="timeline-year">2025</div>
                            <div className="timeline-content">
                                <h4>全新篇章</h4>
                                <p>品牌全面升級，推出永續選物系列，朝向更負責任的生活提案邁進。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ====== CTA 結尾 ====== */}
            <section className="about-cta">
                <h2>開始探索，屬於你的生活風格</h2>
                <p>每一件選物，都是對生活的溫柔提案</p>
                <a href="#/products" className="btn primary">探索商品</a>
            </section>
        </>
    )
}
export default About