import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add/Add'
import AddDod from './pages/AddDod/AddDod'
import List from './pages/List/List'
import ListDod from './pages/ListDod/ListDod'
import Orders from './pages/Orders/Orders'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {

  const url = "http://localhost:4000";

  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr />
      <div className="app-content">
       <Sidebar/>
       <Routes>
        <Route path='/add' element={<Add url={url}/>}/>
        <Route path='/list' element={<List url={url}/>}/>
        <Route path='/addDod' element={<AddDod url={url}/>}/>
        <Route path='/listDod' element={<ListDod url={url}/>}/>
        <Route path='/orders' element={<Orders url={url}/>}/>
       </Routes>
      </div>
    </div>
  )
}

export default App
