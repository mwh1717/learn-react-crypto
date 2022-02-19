import React, { useState, useEffect } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';

import { useGetCryptosQuery } from '../services/cryptoApi';

// FOR ME: simplified is prop coming from Home.js default set to TRUE if you do specify

const Currencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  // passes count for API call based on which page we are on (home page is 10, currency page is 100)
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  // because we are using "useEffect" below, useState does not actually need to be given an arg (see comment below)
  const [cryptos, setCryptos] = useState(cryptosList?.data?.coins);
  const [searchTerm, setSearchTerm] = useState('');

  // exectued anytime args in the array change, including at mount
  useEffect(() => {
    // search for specific coin in array of currencies
    const filteredData = cryptosList?.data?.coins
      .filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()));
    // set to filtered data
    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  console.log('cryptos', cryptos)

  if (isFetching) return 'Loading...';

  // FOR ME, VERY IMPORTANT: previously questioned ? mark. ? prevents looping over undefined variable. see example
  // with "cryptos" variable below

  return (
    // check if simplified prop is being passed, if no simplified then render the search box
    <>
      {!simplified && (
        <div className='search-crypto'>
          <Input placeholder='Search for Currency' onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      )}
      <Row gutter={[32, 32]} className='crypto-card-container'>
        {cryptos?.map((currency) => (
          <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.id}>
            <Link to={`/crypto/${currency.id}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className='crypto-image' src={`${currency.iconUrl}`} />}
                hoverable
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {millify(currency.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Currencies
