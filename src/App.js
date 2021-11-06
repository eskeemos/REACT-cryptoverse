import React from 'react'
import './App.css';
import { Navbar, Homepage ,Exchanges, Cryptocurrencies, CryptoDetails, News } from './components';
import { Routes ,Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';

const App = () => {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">

      </div>
      <div className="footer">
        <Layout>
          <div className="routes">
            <Routes>
              <Route path='/' element={<Homepage />} />
              <Route path='/exchanges' element={<Exchanges />} />
              <Route path='/cryptocurrencies' element={<Cryptocurrencies />} />
              <Route path='/crypto/:coinId' element={<CryptoDetails />} />
              <Route path='/news' element={<News />} />
            </Routes>
           </div>
         </Layout>
      </div>
    </div>
  )
}

export default App
