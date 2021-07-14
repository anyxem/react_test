import React from 'react';

import { Table } from 'antd';
import PropTypes from 'prop-types';
import { useGetTradesQuery } from '../../services/bitfinex';

const columns = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '',
    dataIndex: 'amount',
    key: 'amountchange',
    render: amount => <>{amount < 0 ? 'down' : 'up'}</>,
  },
  {
    title: 'Time',
    dataIndex: 'mts',
    key: 'mts',
    render: text => <>{text}</>,
    sorter: (a, b) => a.mts - b.mts,
    sortOrder: 'descend',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    render: text => <>{text}</>,
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
];

const dataMap = item => ({
  key: item[0],
  id: item[0],
  mts: item[1],
  amount: item[2],
  price: item[3],
});

export function Trades({ pair }) {
  const { data, isLoading } = useGetTradesQuery(pair);

  if (!pair) return <>Select Pair</>;
  if (isLoading) return <>Loading</>;

  const tableData = data.map(dataMap);

  return (
    <div>
      <Table columns={columns} dataSource={tableData} />
    </div>
  );
}

Trades.propTypes = {
  pair: PropTypes.string,
};
