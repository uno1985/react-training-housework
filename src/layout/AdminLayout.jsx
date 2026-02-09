import { NavLink, Outlet } from "react-router"
import { useEffect, useState } from "react";

import { useAuth } from "../context/AuthContext";
import Login from "../pages/Login";


const ProductsLayout = () => {
    const { user, loading, checkLogout } = useAuth();


    if (loading) {
        return <Login />
    }


    return (
        <>

            <div className="container mt-2">
                <div className="row">
                    <div className="col-md-12 col-lg-2 d-none d-lg-block">
                        <ul className="list-unstyled">

                            <li>
                                <NavLink className={({ isActive }) =>
                                    isActive ? "nav-link active" : "nav-link"
                                } to="/admin/orders" end>

                                    訂單管理</NavLink>
                            </li>
                            <li>
                                <NavLink className={({ isActive }) =>
                                    isActive ? "nav-link active" : "nav-link"
                                } to="/admin/editproducts">

                                    商品管理</NavLink>
                            </li>
                            <li>
                                <NavLink className={({ isActive }) =>
                                    isActive ? "nav-link active" : "nav-link"
                                } to="/admin/coupon">

                                    優惠券設定</NavLink>
                            </li>
                            <hr />
                            <li>
                                <div className="btn" onClick={() => checkLogout()}>登出</div>
                            </li>



                        </ul>
                    </div>
                    <div className="col-md-12 col-lg-10">
                        <Outlet />
                    </div>
                </div>
            </div >



        </>






    )
}
export default ProductsLayout