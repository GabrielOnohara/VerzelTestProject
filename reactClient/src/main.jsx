import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

import App from './App.jsx'
import './index.css'
import { UserProvider } from './contexts/UserContext.jsx'; 
import Login from './pages/login/Login.jsx';
import Register from './pages/register/Register.jsx';
import NotFound from './pages/not_found/NotFound.jsx';
import Home from './pages/home/Home.jsx'

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
    path: 'home',
    element: <Home/>
  },
  {
    path: '*',
    element: <NotFound />
  }
])

createRoot(document.getElementById('root'))
.render(
  <StrictMode>
    <UserProvider>
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={true}
        theme="dark"
      />
      <RouterProvider router={router}/>
    </UserProvider>
  </StrictMode>,
)
