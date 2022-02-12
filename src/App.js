import React from 'react'
import { NavBar, ExchangesPage, HomePage, CurrenciesPage, NewsPage, DetailsPage } from './components'
import { Routes, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import './App.css';

const App = () => {
  return (
    <div className='app'>
      <div className='navbar'>
        <NavBar />
      </div>
      <div className='main'>
        <Layout>
          <div className='routes'>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/exchanges' element={<ExchangesPage />} />
              <Route path='/cryptocurrencies' element={<CurrenciesPage />} />
              <Route path='/crypto/:coinId' element={<DetailsPage />} />
              <Route path='/news' element={<NewsPage />} />
            </Routes>
          </div>
        </Layout>
        <div className='footer'>
          <Typography.Title level={5} style={{ color: 'white', textAlign: 'center' }}>
            MWH1717 <br />
          Learn ReactJS
        </Typography.Title>
          <Space>
            <Link to='/'>Home</Link>
            <Link to='/exchanges'>Exchanges</Link>
            <Link to='/news'>News</Link>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default App
