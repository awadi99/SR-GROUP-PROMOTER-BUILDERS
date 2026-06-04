import React, { memo, useMemo } from 'react';
import { 
    LineChart, 
    Line, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer 
} from 'recharts';

const FULL_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const CustomTooltip = memo(({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#141414] px-4 py-2 rounded-xl border border-[#B08B57]/30 shadow-2xl backdrop-blur-sm">
                <p className="text-[10px] font-bold text-[#B08B57] uppercase tracking-[0.2em]">
                    {`${payload[0].value} Projects`}
                </p>
            </div>
        );
    }
    return null;
});

const ProjectGrowthGraph = memo(({ data = [] }) => {
    
    // Ensure all days are represented, even if count is 0
    const chartData = useMemo(() => {
        const sourceData = Array.isArray(data) ? data : [];
        return FULL_WEEK.map((day) => {
            const foundDay = sourceData.find((item) => item.day === day);
            return {
                day: day,
                count: foundDay?.count ?? 0
            };
        });
    }, [data]);

    return (
        <div className="w-full h-full bg-[#0A0A0A] p-6 rounded-2xl border border-[#1A1A1A] flex flex-col transition-all duration-500">
            <header className="mb-6 flex justify-between items-center">
                <h2 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">
                    Project Performance
                </h2>
            </header>

            <div className="w-full flex-1 min-h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart 
                        data={chartData} 
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
                            strokeLinecap="round"
                            strokeJoin="round"
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