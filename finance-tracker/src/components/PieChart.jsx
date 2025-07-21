import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const COLORS = [
  '#2193b0', '#6dd5ed', '#ee9ca7', '#fbc2eb', '#ffdde1', '#a1c4fd', '#f1f5f9', '#1e293b',
];

const PieChart = ({ data }) => {
  const chartData = {
    labels: data.map((d) => d.category),
    datasets: [
      {
        data: data.map((d) => d.value),
        backgroundColor: COLORS,
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="w-full max-w-xs mx-auto">
      <Pie data={chartData} options={{
        plugins: {
          legend: { display: true, position: 'bottom', labels: { color: '#64748b' } },
        },
        responsive: true,
        maintainAspectRatio: false,
      }} height={220} />
    </div>
  );
};

export default PieChart; 