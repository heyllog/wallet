import React from 'react';
import { AreaChart, XAxis, YAxis, CartesianGrid, Area, ResponsiveContainer } from 'recharts';
import styled from '@emotion/styled';

const Chart = styled.div`
  text {
    font-size: 0.6rem;
    font-weight: 400;
  }
`;

const renderCustomDollars = ({ x, y, payload }) => {
  let dollars;

  if (payload.value > 1000) {
    dollars = '$' + payload.value / 1000 + 'k';
  } else {
    dollars = new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(payload.value);
  }

  return (
    <text x={x + 15} y={y - 12} fill='#ffffff' textAnchor='middle'>
      {dollars}
    </text>
  );
};

const renderCustomHours = ({ x, y, payload }) => {
  let hours = payload.value;

  if (hours >= 10) hours = hours + 'h00';
  else hours = `0${hours}h00`;

  return (
    <text x={x - 32} y={y + 20} fill='#ffffff' textAnchor='middle'>
      {hours}
    </text>
  );
};

const renderCustomDay = ({ x, y, payload }) => {
  return (
    <text x={x - 32} y={y + 20} fill='#ffffff' textAnchor='middle'>
      {payload.value}
    </text>
  );
};

function Graph({ period, data }) {
  return (
    <Chart>
      <ResponsiveContainer height={400}>
        <AreaChart
          data={data}
          margin={{
            top: 30,
          }}
        >
          <defs>
            <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#a172ff' stopOpacity={0.3} />
              <stop offset='80%' stopColor='#a172ff' stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke='rgba(136, 137, 145, 0.15)' vertical={false} horizontal />
          <XAxis
            dataKey='time'
            tickLine={false}
            tick={period === 1 ? renderCustomHours : period === 2 ? renderCustomDay : false}
            axisLine={false}
            interval={0}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            mirror
            stroke='#fff'
            tick={renderCustomDollars}
            tickCount={7}
          />
          <Area dataKey='close' stroke='#a172ff' fill='url(#colorUv)' />
        </AreaChart>
      </ResponsiveContainer>
    </Chart>
  );
}

export default Graph;
