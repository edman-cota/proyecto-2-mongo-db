import React from 'react';

const Metrics = ({ metrics }) => {
  return (
    <div className='metrics'>
      {metrics.map((metric) => (
        <div className='metric'>
          <p>{metric.label}</p>
          <p>{metric.main}</p>
        </div>
      ))}
    </div>
  );
};

export default Metrics;
