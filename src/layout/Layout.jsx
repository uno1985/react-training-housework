import { Outlet } from "react-router"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Toast from "../components/Toast"


const Layout = () => {
    return (<>
        <div className="header">
            <Navbar />
        </div>
        <div className="main">
            <Toast />
            <Outlet />
        </div>
        <div className="footer">
            <Footer />
        </div>


    </>)
}
export default Layout