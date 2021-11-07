import React, { useState, useEffect } from 'react';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { Card, Row, Col, Input } from 'antd';
import { Link } from 'react-router-dom';
import millify from 'millify';

const Cryptocurrencies = ({simplified}) => {
  const count = simplified ? 12 : 100;
  const [searchTerm, setSearchTerm] = useState("");
  const {data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) => (
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())));

      setCryptos(filteredData);
  }, [cryptosList, searchTerm])

  if(isFetching) return 'Loading...';

  return (
    <>
    {!simplified && (
      <div className="search-crypto">
        <Input placeholder="Search Cryptocurrency" onChange={(e) => setSearchTerm(e.target.value)} />
      </div>
    )}
      <Row gutter={[32, 32]} className="crypto-card-cont">
        {cryptos?.map((currency) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id} >
            <Link to={`crypto/${currency.id}`} >
              <Card hoverable title={`${currency.rank}. ${currency.name}`} extra={<img className="crypto-image" src={currency.iconUrl} />} >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Currency Change: {millify(currency.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Cryptocurrencies