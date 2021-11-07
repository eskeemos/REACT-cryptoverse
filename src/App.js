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
        <div className="footer" level={5} style={{color:"white", textAlign:"center"}}>
          <Typography.Title>
            Cryptoverse <br />
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/exchanges">Exchanges</Link>
            <Link to="/news">News</Link>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default App
