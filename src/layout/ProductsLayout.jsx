import { Outlet } from "react-router"
import CartBtn from "../components/CartsBtn"
import { useState } from "react";




const ProductsLayout = () => {
    const [cartTrigger, setCartTrigger] = useState(0);
    return (
        <>

            <div className="container mt-2">
                <div className="row">
                    <div className="col-md-12 col-lg-2 d-none d-lg-block">
                        <ul className="list-unstyled">
                            <li>還沒做的選單</li>

                        </ul>
                    </div>
                    <div className="col-md-12 col-lg-10">
                        <Outlet context={{ setCartTrigger }} />
                    </div>
                </div>
            </div >
            <CartBtn trigger={cartTrigger} />


        </>






    )
}
export default ProductsLayout