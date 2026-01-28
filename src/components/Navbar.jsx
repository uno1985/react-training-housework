import { Link, NavLink } from "react-router"
import '../styles/navbar.css'
import { useEffect } from "react"

const Navbar = () => {






    return (<>
        <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top py-3">
            <div className="container">
                <svg fill="none" className="logo" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z" fill="currentColor" fillRule="evenodd"></path>
                </svg>
                <Link className="navbar-brand logoTitle" to="/">
                    UNOS
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item">
                            <NavLink className={({ isActive }) =>
                                isActive ? "nav-link active" : "nav-link"
                            } to="/">
                                首頁
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={({ isActive }) =>
                                isActive ? "nav-link active" : "nav-link"
                            } to="/products">
                                所有商品
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={({ isActive }) =>
                                isActive ? "nav-link active" : "nav-link"
                            } to="/about">
                                關於我們
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={({ isActive }) =>
                                isActive ? "nav-link active" : "nav-link"
                            } to="/carts">
                                購物車
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>



    </>)
}
export default Navbar