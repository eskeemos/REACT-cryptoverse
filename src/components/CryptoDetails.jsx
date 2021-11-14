import React, {useState} from 'react';
import LineChart from './LineChart';
import HTMLReactParser from 'html-react-parser';
import {useParams} from 'react-router-dom';
import millify from 'millify';
import {Col, Row, Typography, Select} from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery  } from '../services/cryptoApi';

const {Title, Text} = Typography;
const {Option} = Select;

const CryptoDetails = () => {
  const {coinId} = useParams();
  const [timeperiod, setTimePeriod] = useState('7d');
  const {data, isFetching} = useGetCryptoDetailsQuery(coinId);
  const {data: coinHistory} = useGetCryptoHistoryQuery({coinId, timeperiod});
  const cryptoDetails = data?.data?.coin;

  if(isFetching) return 'Loading...';

  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${cryptoDetails.volume && millify(cryptoDetails.volume)}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: cryptoDetails.approvedSupply ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${millify(cryptoDetails.totalSupply)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${millify(cryptoDetails.circulatingSupply)}`, icon: <ExclamationCircleOutlined /> },
  ];

  return (
    <Col className="coin-detail-cont">
      <Col className="coin-heading-cont">
        <Title className="coin-name" level={2}>
          {cryptoDetails.name} ({cryptoDetails.slug}) Price
        </Title>
        <p>
          {CryptoDetails.name} live price in US dollars.
          View value statistics, market cap and supply.
        </p>
      </Col>
      <Select 
        onChange={(value) => setTimePeriod(value)}
        defaultValue="7d" 
        className="select-timeperiod" 
        placeholder="Select Time Period"
      >
        {time.map(v => <Option key={v}>{v}</Option>)}
      </Select>
      <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails.price)} coinName={cryptoDetails.name} />
      <Col className="stats-cont">
          <Col className="coin-value-statistics">
            <Col className="coin-value-statistics-heading">
              <Title level={3} className="coin-detailes-heading">
                {cryptoDetails.name} Value Statistics
              </Title>
              <p>
                An overview showing the stats of {cryptoDetails.name}
              </p>
            </Col>
            {stats.map(({icon, title, value}) => (
              <Col className="coin-stats">
                <Col className="coin-stats-name">
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className="stats">{value}</Text>
              </Col>
            ))}
          </Col>
          <Col className="other-stats-info">
            <Col className="coin-value-statistics-heading">
              <Title level={3} className="coin-detailes-heading">
                Other statistics
              </Title>
              <p>
                An overview showing the stats of all cryptocurrencies
              </p>
            </Col>
            {genericStats.map(({icon, title, value}) => (
              <Col className="coin-stats">
                <Col className="coin-stats-name">
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className="stats">{value}</Text>
              </Col>
            ))}
          </Col>
      </Col>
      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Title level={3} className="coin-details-heading">
            What is {cryptoDetails.name}
            {HTMLReactParser(cryptoDetails.description)}
          </Title>
        </Row>
        <Col className="coin-links">
          <Title level={3} className="coin-details-heading">
              {cryptoDetails.name} Links
          </Title>
          {cryptoDetails.links.map(v => <Row className="coin-link" key="link.name">
            <Title level={5} className="link-name">
              {v.type}
            </Title>
            <a href={v.url} target="blank" rel="noreffer">
              {v.name}
            </a>
          </Row>)}
        </Col>
      </Col>
    </Col>
  )
}

export default CryptoDetails

// 1:36:18