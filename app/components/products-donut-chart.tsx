'use client';

import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const data = [
  { name: 'Product 1', value: 11 },
  { name: 'Product 2', value: 10 },
  { name: 'Product 3', value: 18 },
  { name: 'Product 4', value: 19 },
  { name: 'Product 5', value: 12 },
];

const COLORS = ['#3b82f6', '#8b5cf6', '#f59e0b', '#ec4899', '#10b981'];

const ProductsDonutChart = () => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="w-full h-[420px] p-4 sm:p-6 bg-white rounded-xl shadow-md border border-gray-100">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-800">Product Distribution</h3>
        <p className="text-sm text-gray-500">Share of total inventory by product</p>
      </div>

      <div className="relative w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={3}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}
              formatter={(value) => [`${value} units`, 'Quantity'] as [string, string]}
            />
            <Legend
              verticalAlign="bottom"
              iconType="circle"
              wrapperStyle={{ fontSize: 12, color: '#6b7280' }}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center -mt-6">
          <span className="text-2xl font-bold text-gray-900">{total}</span>
          <span className="text-xs text-gray-500">Total Units</span>
        </div>
      </div>
    </div>
  );
};

export default ProductsDonutChart;
