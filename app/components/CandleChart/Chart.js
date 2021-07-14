/* eslint-disable */
import React, { useState } from 'react';
import * as d3 from 'd3';
import './styles.css';

import Candle from './Candle';
import CrossHairs from './CrossHairs';

const Chart = props => {
  const { data, width: chart_width, height: chartHeight } = props;

  const [mouseCoords, setMouseCoords] = useState({
    x: 0,
    y: 0,
  });

  // find the high and low bounds of all the bars being sidplayed
  const dollar_high = d3.max(data.map(bar => bar.high)) * 1.05;
  const dollar_low = d3.min(data.map(bar => bar.low)) * 0.95;

  const chartDims = {
    pixel_width: chart_width,
    pixel_height: chartHeight,
    dollar_high,
    dollar_low,
    dollar_delta: dollar_high - dollar_low,
  };

  const dollarAt = pixel => {
    const dollar =
      (Math.abs(pixel - chartDims.pixel_height) / chartDims.pixel_height) *
        chartDims.dollar_delta +
      chartDims.dollar_low;

    return pixel > 0 ? dollar.toFixed(2) : '-';
  };

  const pixelFor = dollar =>
    Math.abs(
      ((dollar - chartDims.dollar_low) / chartDims.dollar_delta) *
        chartDims.pixel_height -
        chartDims.pixel_height,
    );

  const onMouseLeave = () => {
    setMouseCoords({
      x: 0,
      y: 0,
    });
  };

  const onMouseMoveInside = e => {
    setMouseCoords({
      x:
        e.nativeEvent.x -
        Math.round(e.currentTarget.getBoundingClientRect().left),
      y:
        e.nativeEvent.y -
        Math.round(e.currentTarget.getBoundingClientRect().top),
    });
  };

  const onMouseClickInside = e => {
    console.log(`Click at ${e.nativeEvent.offsetX}, ${e.nativeEvent.offsetY}`);
  };

  // calculate the candle width
  const candleWidth = Math.floor((chart_width / data.length) * 0.7);

  return (
    <svg
      width={chart_width}
      height={chartHeight}
      className="chart"
      onMouseMove={onMouseMoveInside}
      onClick={onMouseClickInside}
      onMouseLeave={onMouseLeave}
    >
      {data.map((bar, i) => {
        const candle_x = (chart_width / (data.length + 1)) * (i + 1);
        return (
          <Candle
            key={i}
            data={bar}
            x={candle_x}
            candleWidth={candleWidth}
            pixelFor={pixelFor}
          />
        );
      })}
      <text x="10" y="16" fill="white" fontSize="10">
        <tspan>
          Mouse: {mouseCoords.x}, {mouseCoords.y}
        </tspan>
        <tspan x="10" y="30">
          Dollars: ${dollarAt(mouseCoords.y)}
        </tspan>
      </text>
      <CrossHairs x={mouseCoords.x} y={mouseCoords.y} chartDims={chartDims} />
    </svg>
  );
};

export default Chart;
