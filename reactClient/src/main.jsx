import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from './login/Login.jsx';
import Register from './register/Register.jsx';
import NotFound from './not_found/NotFound.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
  },
  {
    path: 'login',
    element: <Login/>
  },
  {
    path: 'register',
    element: <Register/>
  },
  {
    path: '*',
    element: <NotFound />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
