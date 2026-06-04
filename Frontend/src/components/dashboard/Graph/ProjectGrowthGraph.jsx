import React, { memo, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const fullWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const CustomTooltip = memo(({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#141414] px-4 py-2 rounded-xl border border-[#B08B57]/30 shadow-2xl">
                <p className="text-[10px] font-bold text-[#B08B57] uppercase tracking-[0.2em]">
                    {`${payload[0].value} Projects`}
                </p>
            </div>
        );
    }
    return null;
});

const ProjectGrowthGraph = memo(({ data = [] }) => {
    // Logic: Merge API data with fullWeek template to ensure all days appear
    const displayData = useMemo(() => {
        const sourceData = data || [];
        return fullWeek.map((day) => {
            const foundDay = sourceData.find((item) => item.day === day);
            return {
                day: day,
                count: foundDay ? foundDay.count : 0
            };
        });
    }, [data]);

    return (
        <div className="w-full bg-[#0A0A0A] p-6 rounded-2xl border border-[#1A1A1A] shadow-none flex flex-col">
            <header className="mb-6">
                <h2 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">
                    Project Performance
                </h2>
            </header>

            <div className="w-full h-[300px] md:h-[400px] relative">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart 
                        data={displayData} 
                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
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
                            tick={{ fontSize: 10, fontWeight: 600, fill: '#555' }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 10, fontWeight: 600, fill: '#555' }}
                        />
                        <Tooltip 
                            content={<CustomTooltip />} 
                            cursor={{ stroke: '#B08B57', strokeWidth: 1, strokeDasharray: '4 4' }} 
                        />
                        <Line
                            type="monotone"
                            dataKey="count"
                            stroke="#B08B57"
                            strokeWidth={3}
                            isAnimationActive={true}
                            animationDuration={1500}
                            dot={{ r: 4, fill: '#050505', stroke: '#B08B57', strokeWidth: 2 }}
                            activeDot={{ r: 6, fill: '#B08B57', stroke: '#050505', strokeWidth: 2 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
});

ProjectGrowthGraph.displayName = 'ProjectGrowthGraph';
export default ProjectGrowthGraph;