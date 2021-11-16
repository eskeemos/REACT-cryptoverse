import React from 'react';
import millify from 'millify';
import HTMLReactParser from 'html-react-parser';
import { Collapse,Row,Col,Typography, Avatar } from 'antd';
import {useGetExchangesQuery} from '../services/cryptoApi';
import Loader from './Loader';

const {Text} = Typography;
const {Panel} = Collapse;

const Exchanges = () => {
  const {data, isFetching} = useGetExchangesQuery();

  const exchangesList = data?.data?.exchanges;

  console.log(exchangesList);

  if(isFetching) return <Loader />;

  return (
      <>
        <Row>
          <Col span={6}>Exchanges</Col>
          <Col span={6}>24h Trade Volume</Col>
          <Col span={6}>Markets</Col>
          <Col span={6}>Change</Col>
        </Row>
        <Row>
          {exchangesList.map(x => (
            <Col span={24}>
              <Collapse>
                <Panel key={x.id} showArrow={false} header={(
                  <Row key={x.id}>
                    <Col span={6}>
                      <Text>
                        <strong>{x.rank}</strong>
                      </Text>
                      <Avatar className="exchange-image" src={x.iconUrl}/>
                      <Text>
                        <strong>{x.name}</strong>
                      </Text>
                    </Col>
                    <Col span={6}>${millify(x.volume)}</Col>
                    <Col span={6}>${millify(x.numberOfMarkets)}</Col>
                    <Col span={6}>${millify(x.marketShare)}%</Col>
                  </Row>
                )}
                >
                {HTMLReactParser(x.description || '')}
                </Panel>
              </Collapse>
            </Col>
            ))}
        </Row>
      </>
  )
}

export default Exchanges
