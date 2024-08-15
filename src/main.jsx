import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom";
import router from './Routes/Routes.jsx';
import AuthProvider from './Providers/AuthProvider.jsx';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <div className='bg-acBlackSecondary max-w-[1440px] mx-auto'>
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  </StrictMode>,
)
