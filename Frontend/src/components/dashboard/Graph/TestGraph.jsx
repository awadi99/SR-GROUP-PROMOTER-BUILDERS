import React, { memo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CustomTooltip = memo(({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#141414] px-4 py-2 rounded-xl border border-[#333] shadow-2xl">
                <p className="text-[10px] font-bold text-[#B08B57] uppercase tracking-[0.2em]">
                    {`${payload[0].value} Operations`}
                </p>
            </div>
        );
    }
    return null;
});

const TestGraph = memo(({ testData }) => {
    const data = testData || [];

    return (
        <div className="w-full bg-[#0A0A0A] p-8 rounded-2xl border border-[#1A1A1A] shadow-none">
            <header className="flex items-center justify-between mb-8">
                <h2 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">
                    Weekly Performance
                </h2>
            </header>

            {/* Added min-h and min-w to prevent Recharts layout crash */}
            <div 
                key={data?.length ? 'loaded' : 'empty'} 
                className="w-full h-[300px] min-h-[300px] min-w-0"
            >
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart 
                        data={data} 
                        margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
                    >
                        <CartesianGrid 
                            vertical={false} 
                            stroke="#1A1A1A" 
                            strokeDasharray="3 3" 
                        />
                        <XAxis
                            dataKey="day"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 10, fontWeight: 700, fill: '#555' }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 10, fontWeight: 700, fill: '#555' }}
                        />
                        <Tooltip 
                            content={<CustomTooltip />} 
                            cursor={{ stroke: '#B08B57', strokeWidth: 1, strokeDasharray: '4 4' }} 
                        />
                        <Line
                            type="monotone"
                            dataKey="tests"
                            stroke="#B08B57"
                            strokeWidth={3}
                            dot={{ r: 4, fill: '#050505', stroke: '#B08B57', strokeWidth: 2 }}
                            activeDot={{ r: 6, fill: '#B08B57', stroke: '#050505', strokeWidth: 2 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
});

TestGraph.displayName = 'TestGraph';
export default TestGraph;