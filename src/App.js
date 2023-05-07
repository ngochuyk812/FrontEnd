import logo from './logo.svg';
import './App.css';
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import { Route,BrowserRouter, redirect , Routes } from 'react-router-dom';
import PrivateRoutes from './components/PrivateRoute/PrivateRoute'
import { authRoutes, privateRoutes, publicRoutes } from './routes';
import { useDispatch, useSelector } from 'react-redux';
import Login from './pages/Login';
import Notify from './components/Notify/Notify';
import {colors} from './components/Notify/Notify';

function App() {
    const notify = useSelector(state =>{
        return state.notify
    })
    const auth = useSelector(state =>{
        return state.auth
    })
    console.log("Account " + auth.user)
  return (
    
    <BrowserRouter>
      <div>
      {(notify.content !== '')? <Notify color={notify.color} title={notify.title} content={notify.content}/> : ""}
        <Header/>
        <Routes>
            {
            publicRoutes.map(tmp=>{
              const Page = tmp.component
              return <Route path={tmp.path} element={<Page />} />
            })
            }
            {
            privateRoutes.map(tmp=>{
            const Page = tmp.component
            return <Route path={tmp.path} element={<PrivateRoutes path={tmp.path} Page={<Page />} />} />
            }) 
            }
        </Routes>
        <Footer/>
      </div>

    </BrowserRouter>
    
  );
}

export default App;
