import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './pages/Home.jsx'
import App from './App.jsx'
import LoginPage from './pages/loginPage.jsx'
import Auth from './utils/auth.js'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className="display-2">Wrong page!</h1>,
    children: [
      {
        index: true,
        element: Auth.loggedIn() ? <Home />: <LoginPage />
      }, 
      {
        path: '/login',
        element: <LoginPage />
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
