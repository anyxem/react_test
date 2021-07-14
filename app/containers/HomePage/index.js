import React, { useState } from 'react';
import { Breadcrumb, Select } from 'antd';
import { useGetListPairExchangeQuery } from '../../services/bitfinex';
import { Trades } from '../Trades';

export default function HomePage() {
  const { data, isLoading } = useGetListPairExchangeQuery();
  const [pair, setPair] = useState();

  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Tickers</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-content">
        <Select value={pair} onSelect={setPair} style={{ width: 120 }}>
          {!isLoading &&
            data[0].map(item => (
              <Select.Option key={item} value={item}>
                {item}
              </Select.Option>
            ))}
        </Select>

        <Trades pair={pair} />
      </div>
    </>
  );
}
