import Home from "../pages/Home";
import Products from "../pages/Products/Products";
import Checkout from "../pages/Checkout";
import Contact from "../pages/Contact";
import Detail from "../pages/Detail";
import ForgotPassword from "../pages/ForgotPassword";
import Login from "../pages/Login/Login";
import Orders from "../pages/Orders";
import Register from "../pages/Register";
import Profile from "../components/layout";
import InfoUser from "../pages/Profile";
import Layout from "../components/layout";
import Setting from "../pages/Setting";

const publicRoutes = [
  { path: "/", component: Home },
  { path: "/products", component: Products },
  { path: "/contact", component: Contact },
  { path: "/detail", component: Detail },
  { path: "/forgotPassword", component: ForgotPassword },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
];
const authRoutes = [];
const privateRoutes = [
  { path: "/profile", component:InfoUser, layout: Layout },
  { path: "/orders", component: Orders, layout: Layout},
  { path: "/setting", component: Setting, layout: Layout},
  { path: "/checkout", component: Checkout},

];

export { publicRoutes, privateRoutes, authRoutes };
