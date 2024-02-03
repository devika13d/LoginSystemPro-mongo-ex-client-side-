import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home'
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
function App() {
  return (
    <>
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/registration' element={<Register/>}/>
    <Route path='/dashboard' element={<Dashboard/>}></Route>

    </Routes>
    </>
  );
}

export default App;
