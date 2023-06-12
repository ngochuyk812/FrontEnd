import Home from "../pages/Home";
import Products from "../pages/Products/Products";
import Checkout from "../pages/Checkout";
import Contact from "../pages/Contact";
import Detail from "../pages/Detail";
import ForgotPassword from "../pages/ForgotPassword";
import Login from "../pages/Login/Login";
import Orders from "../pages/Orders";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
const publicRoutes = [
  { path: "/", component: Home },
  { path: "/products", component: Products },
  { path: "/contact", component: Contact },
  { path: "/detail", component: Detail },
  { path: "/forgotPassword", component: ForgotPassword },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/checkout", component: Checkout },
];
const authRoutes = [];
const privateRoutes = [
  { path: "/orders", component: Orders },
  { path: "/profile", component: Profile },
];

export { publicRoutes, privateRoutes, authRoutes };
