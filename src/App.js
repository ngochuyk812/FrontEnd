import logo from './logo.svg';
import './App.css';
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import { Route,BrowserRouter, Router, Routes } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './routes';
import { useDispatch, useSelector } from 'react-redux';
import Login from './pages/Login';
function App() {

    const profile = useSelector(state =>{
        return state.profile.account
    })
    console.log("Account " + profile.user)
  return (
    
    <BrowserRouter>
      <div>
        <Header/>
        <Routes>
            {publicRoutes.map(tmp=>{
              const Page = tmp.component
              return <Route path={tmp.path} element={<Page />} />
            })}
            {
                profile.user  ?
              privateRoutes.map(tmp=>{
              const Page = tmp.component
              return <Route path={tmp.path} element={<Page />} />
            }) : 
              privateRoutes.map(tmp=>{
                return <Route path={tmp.path} element={<Login />} />
              })
            
            }
        </Routes>
        <Footer/>
      </div>

    </BrowserRouter>
    
  );
}

export default App;
