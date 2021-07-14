/* eslint-disable */
import React from 'react';
import classNames from 'classnames';

const Candle = props => {
  const { data, x, candleWidth, pixelFor } = props;

  const up = data.close > data.open;
  const bar_top = pixelFor(up ? data.close : data.open);
  const bar_bottom = pixelFor(up ? data.open : data.close);
  const bar_height = bar_bottom - bar_top;
  const wick_top = pixelFor(data.high);
  const wick_bottom = pixelFor(data.low);

  return (
    <>
      <rect
        x={x - candleWidth / 2}
        y={bar_top}
        width={candleWidth}
        height={bar_height}
        className={classNames({
          candle: true,
          up,
          down: !up,
        })}
      />
      <line
        className={classNames({
          wick: true,
          top: true,
          up,
          down: !up,
        })}
        x1={x}
        y1={bar_top}
        x2={x}
        y2={wick_top}
      />
      <line
        className={classNames({
          wick: true,
          bottom: true,
          up,
          down: !up,
        })}
        x1={x}
        y1={bar_bottom}
        x2={x}
        y2={wick_bottom}
      />
    </>
  );
};

export default Candle;
