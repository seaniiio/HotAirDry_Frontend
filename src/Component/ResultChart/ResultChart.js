import React, { useRef, useEffect, useState } from "react";
import Chart from "chart.js/auto";

const DoughnutChart = ({ data }) => {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const newChartInstance = new Chart(chartRef.current, {
        type: "doughnut",
        data: {
          labels: data.labels,
          datasets: [
            {
              data: data.values,
              backgroundColor: data.colors,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
            },
          },
          layout: {
            padding: {
              left: 10, // 왼쪽 패딩
              right: 10, // 오른쪽 패딩
              top: 10, // 위쪽 패딩
              bottom: 10, // 아래쪽 패딩
            },
          },
        },
      });
      setChartInstance(newChartInstance);
    }
  }, [data]);

  return (
    <div style={{ height: "400px" }}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default DoughnutChart;
