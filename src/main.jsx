
import { createRoot } from 'react-dom/client'

// 載入bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './styles/style.css'

import { MsgProvider } from "./context/MsgContext";

// react-router相關檔案
import { createHashRouter, RouterProvider } from 'react-router';
import routes from './routes/router';


const router = createHashRouter(routes)

createRoot(document.getElementById('root')).render(
  <MsgProvider>
    <RouterProvider router={router} />
  </MsgProvider>

)
