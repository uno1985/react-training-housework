import Layout from "../layout/Layout"
import Home from "../pages/Home"
import About from "../pages/About"
import Products from "../pages/Products"
import Carts from "../pages/carts"
import ProductsLayout from "../layout/ProductsLayout"
import AdminLayout from "../layout/AdminLayout"
import Product from "../pages/Product"
import EditProducts from "../pages/EditProducts"
import Coupon from "../pages/Coupon"
import Orders from "../pages/Orders"
import Service from "../pages/Service"

import { Navigate } from "react-router"


const routes = [
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />

            },
            {
                path: '/about',
                element: <About />

            },
            {
                path: '/service',
                element: <Service />
            },
            {
                path: '/admin',
                element: <AdminLayout />,
                children: [
                    {
                        index: true,
                        element: <Navigate to="orders" replace />
                    },
                    {

                        path: 'orders',
                        element: <Orders />
                    },
                    {
                        path: 'editproducts',
                        element: <EditProducts />
                    },
                    {
                        path: 'coupon',
                        element: <Coupon />
                    },

                ]

            },
            {
                path: '/products',
                element: <ProductsLayout />,
                children: [
                    {
                        path: '/products',
                        element: <Products />,
                    },
                    {
                        path: '/products/:id',
                        element: <Product />,
                    },
                ]

            },
            {
                path: '/carts',
                element: <Carts />

            },
        ]
    },

]

export default routes