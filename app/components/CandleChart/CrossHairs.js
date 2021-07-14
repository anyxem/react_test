/* eslint-disable */
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const CrossHairs = props => {
  const { x, y, chartDims } = props;

  if (x + y === 0) {
    return <></>;
  }

  return (
    <>
      <line
        x1={0}
        y1={y}
        x2={chartDims.pixel_width}
        y2={y}
        className={classNames({
          cross_hair: true,
          horz: true,
        })}
      />
      <line
        x1={x}
        y1={0}
        x2={x}
        y2={chartDims.pixel_height}
        className={classNames({
          cross_hair: true,
          vert: true,
        })}
      />
    </>
  );
};

CrossHairs.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  chartDims: PropTypes.any,
};

export default CrossHairs;
