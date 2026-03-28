'use client';

import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Jan', productA: 4000, productB: 2400 },
  { name: 'Feb', productC: 3000, productA: 1398, productB: 2210 },
  { name: 'Mar', productC: 2000, productA: 9800, productB: 2290 },
  { name: 'Apr', productC: 2780, productA: 3908, productB: 2000 },
  { name: 'May', productC: 1890, productA: 4800, productB: 2181 },
  { name: 'Jun', productC: 2390, productA: 3800, productB: 2500 },
  { name: 'Jul', productC: 3490, productA: 4300, productB: 2100 },
];

const ProductAreaChart = () => {
  return (
    <div className="w-full h-[400px] p-6 bg-white rounded-xl shadow-md border border-gray-100">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-800">Growth Analysis</h3>
        <p className="text-sm text-gray-500">Monthly performance of top products</p>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          {/* Gradients for the "glow" effect */}
          <defs>
            <linearGradient id="colorA" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorB" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#9ca3af', fontSize: 12 }}
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#9ca3af', fontSize: 12 }} 
          />
          <Tooltip 
            contentStyle={{ 
              borderRadius: '8px', 
              border: 'none', 
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
            }} 
          />
          
          <Area
            type="monotone"
            dataKey="productA"
            stroke="#3b82f6"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorA)"
            stackId="1"
          />
          <Area
            type="monotone"
            dataKey="productB"
            stroke="#8b5cf6"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorB)"
            stackId="1"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductAreaChart;