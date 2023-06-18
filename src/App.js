import logo from "./logo.svg";
import "./App.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { Route, BrowserRouter, redirect, Routes } from "react-router-dom";
import PrivateRoutes from "./components/PrivateRoute/PrivateRoute";
import { authRoutes, privateRoutes, publicRoutes } from "./routes";
import { useDispatch, useSelector } from "react-redux";
import Notify from "./components/Notify/Notify";
import { loadProducts } from "../src/redux/slice/productSlice";
import { loadCarts } from "../src/redux/slice/cartSlice";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const notify = useSelector((state) => {
    return state.notify;
  });
  const user = useSelector((state) => {
    return state.auth.user;
  });
  useEffect(() => {
    dispatch(loadProducts());

  }, []);
  useEffect(() => {
    if (user) {
      dispatch(loadCarts(user.id));
    }
  }, [user]);

  return (
    <BrowserRouter>
      <div>

        {notify.content !== "" ? (
          <Notify
            color={notify.color}
            title={notify.title}
            content={notify.content}
          />
        ) : (
          ""
        )}
        <Header />
        <Routes>
          {publicRoutes.map((tmp) => {
            const Page = tmp.component;
            return <Route path={tmp.path} element={<Page />} />;
          })}
          {privateRoutes.map((tmp) => {
            const Page = tmp.component;
            if(tmp.layout){
              let Layout = tmp.layout
              return (
                  <Route
                      path={tmp.path}
                      element={<PrivateRoutes path={tmp.path} Page={<Layout page = {Page}/>} />}
                  />
              );

            }else
            return (
              <Route
                path={tmp.path}
                element={<PrivateRoutes path={tmp.path} Page={<Page />} />}
              />
            );
          })}
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
