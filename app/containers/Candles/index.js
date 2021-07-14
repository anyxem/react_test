import React from 'react';

import PropTypes from 'prop-types';
import { useGetCandlesQuery } from '../../services/bitfinex';
import Chart from '../../components/CandleChart/Chart';

const dataMap = item => ({
  time: item[0],
  open: item[1],
  high: item[3],
  low: item[4],
  close: item[2],
  volume: item[5],
});

export function Candles({ pair }) {
  const { data, isLoading } = useGetCandlesQuery(pair);

  if (!pair) return <>Select Pair</>;
  if (isLoading) return <>Loading</>;

  const chartData = data.map(dataMap);

  const chartWidth = 500;
  const chartHeight = 300;

  return (
    <div>
      <Chart data={chartData} width={chartWidth} height={chartHeight} />
    </div>
  );
}

Candles.propTypes = {
  pair: PropTypes.string,
};
