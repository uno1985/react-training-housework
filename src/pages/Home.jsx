import { Link } from 'react-router'
import axios from 'axios';

import '../styles/home.css'
import { useEffect, useState } from 'react'

//引入env設置
const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;
const Home = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProduct = async () => {
            try {
                const response = await axios.get(`${API_BASE}/api/${API_PATH}/products/all`)
                setProducts(response.data.products)

            } catch (error) {
                console.log(error)

            }

        }
        getProduct();


    }, [])



    return (
        <>
            <section className="hero">
                <h1>UNOS</h1>
                <p>
                    質感生活．精選小物<br />
                    讓日常，多一點剛剛好的美好
                </p>
                <div className="hero-actions">
                    <Link to="/products" className="btn primary">
                        探索商品
                    </Link>

                    <Link to="#about" className="btn outline">
                        關於 UNOS
                    </Link>
                </div>
            </section>
            <section className="about">
                <h2>關於 UNOS</h2>
                <p>
                    UNOS 是一個專注於設計感與實用性的質感小物電商平台。
                    我們相信，生活中真正重要的，不是多，而是剛剛好。
                </p>
                <p>
                    在每天重複的日常裡，一張桌子、一盞燈、一只杯子，
                    往往陪伴我們最久，也最容易被忽略。
                    UNOS 希望重新看待這些細微卻重要的存在，
                    讓生活用品不只是功能性的物件，而是能被長時間使用、理解與喜愛的選擇。
                </p>
                <p>
                    從桌上用品、生活配件到居家選物，
                    我們重視材質、比例與使用時的手感，
                    也在意設計是否能自然融入不同的生活情境。
                    每一件商品，都經過挑選與取捨，
                    只留下那些能在日常中長久存在的設計。
                </p>
                <p>UNOS 不追求流行的速度，
                    而是希望陪你慢慢建立屬於自己的生活節奏。
                    在看似平凡的日子裡，
                    用剛剛好的物件，創造剛剛好的美好。
                </p>
            </section>
            <section className="features">
                <div className="feature-row">
                    <div className="feature-image">
                        <img
                            src="https://images.unsplash.com/photo-1553877522-43269d4ea984"
                            alt="精選設計"
                        />
                    </div>
                    <div className="feature-text">
                        <h3>精選設計</h3>
                        <p>我們挑選每一件商品，只留下真正值得擁有的設計。</p>
                    </div>
                </div>

                <div className="feature-row reverse">
                    <div className="feature-image">
                        <img
                            src="https://images.unsplash.com/photo-1695978918743-67fce79b6c9b"
                            alt="實用至上"
                        />
                    </div>
                    <div className="feature-text">
                        <h3>實用至上</h3>
                        <p>好看不只是外表，而是每天使用時的順手與安心。</p>
                    </div>
                </div>

                <div className="feature-row">
                    <div className="feature-image">
                        <img
                            src="https://images.unsplash.com/photo-1497366811353-6870744d04b2"
                            alt="生活質感"
                        />
                    </div>
                    <div className="feature-text">
                        <h3>生活質感</h3>
                        <p>從細節出發，讓日常用品成為生活風格的一部分。</p>
                    </div>
                </div>
            </section>



            <section className="products">
                <h2>人氣選物</h2>

                <div className="marquee">
                    <div className="track product-grid">
                        {[...products, ...products].map((item, index) => (
                            <div className="product-card" key={index}>
                                <img
                                    src={item.imageUrl}
                                    alt={item.title}
                                    className="img-fluid rounded"
                                    style={{ aspectRatio: "1 / 1", objectFit: "cover" }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="closing">
                <h2>Little Things That Matter</h2>
                <p>
                    有些美好，不需要張揚。<br />
                    它只是靜靜地存在，陪你過每一天。
                </p>
            </section>

        </>



    )
}
export default Home