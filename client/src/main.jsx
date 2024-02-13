import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home.jsx';
import App from './App.jsx';
import LoginPage from './pages/loginPage.jsx';
import Auth from './utils/auth.js';
import Stripe from './components/Stripe.jsx';

const router = (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={Auth.loggedIn() ? <Home /> : <LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/donate" element={<Stripe />} />
      </Route>
    </Routes>
  </Router>
);

ReactDOM.render(router, document.getElementById('root'));