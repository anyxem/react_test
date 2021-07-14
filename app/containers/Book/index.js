import React from 'react';

import { Table } from 'antd';
import PropTypes from 'prop-types';
import { useGetOrderBookQuery } from '../../services/bitfinex';

const columns = [
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'count',
    dataIndex: 'count',
    key: 'count',
  },
  {
    title: 'amount',
    dataIndex: 'amount',
    key: 'amount',
  },
];

const dataMap = item => ({
  price: item[0],
  count: item[1],
  amount: item[2],
});

export function Book({ pair }) {
  const { data, isLoading } = useGetOrderBookQuery(pair);

  if (!pair) return <>Select Pair</>;
  if (isLoading) return <>Loading</>;

  const tableData = data.map(dataMap);

  return (
    <div>
      <Table columns={columns} dataSource={tableData} />
    </div>
  );
}

Book.propTypes = {
  pair: PropTypes.string,
};
