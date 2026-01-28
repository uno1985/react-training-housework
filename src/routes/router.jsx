import Layout from "../layout/Layout"
import Home from "../pages/Home"
import About from "../pages/About"
import Products from "../pages/Products"
import Carts from "../pages/carts"
import ProductsLayout from "../layout/ProductsLayout"
import Product from "../pages/Product"



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