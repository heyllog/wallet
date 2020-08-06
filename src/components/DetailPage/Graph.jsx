import React from 'react';
import { AreaChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area } from 'recharts';
import styled from '@emotion/styled';

const data = [
  {
    name: '00h',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: '01h',
    uv: 2000,
    pv: 6000,
    amt: 2290,
  },
  {
    name: '02h',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: '03h',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: '04h',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: '05h',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: '06h',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: '07h',
    uv: 2000,
    pv: 4300,
    amt: 2290,
  },
  {
    name: '08h',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: '09h',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: '10h',
    uv: 2390,
    pv: 2600,
    amt: 2500,
  },
];

const Chart = styled.div`
  .recharts-cartesian-grid-horizontal line {
    stroke: rgba(136, 137, 145, 0.15);
  }

  .recharts-text {
    fill: #ffffff;
  }
`;

function Graph({ name }) {
  return (
    <Chart>
      <AreaChart
        width={375}
        height={425}
        data={data}
        margin={{
          top: 5,
          bottom: 5,
        }}
      >
        <defs>
          <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='#a172ff' stopOpacity={0.3} />
            <stop offset='80%' stopColor='#a172ff' stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} horizontal />
        <XAxis dataKey='name' tickLine={false} tickCount={6} />
        <YAxis axisLine={false} tickLine={false} mirror />
        <Area dataKey='pv' stroke='#a172ff' fill='url(#colorUv)' />
      </AreaChart>
    </Chart>
  );
}

export default Graph;
