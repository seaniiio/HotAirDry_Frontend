import React, { useRef, useEffect, useState } from "react";
import Chart from "chart.js/auto";

const DoughnutChart = ({ data }) => {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  const nowLot = "로트 " + String(data.lot);
  console.log(data);

  useEffect(() => {
    if (chartInstance) {
      chartInstance.destroy();
    }
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
            tooltip: {
              enabled: true, // 툴팁 활성화 (기본값)
            },
          },
          layout: {
            padding: {
              left: 10,
              right: 10,
              top: 10,
              bottom: 10,
            },
          },
          animation: {
            duration: 0, // 애니메이션 비활성화
          },
        },
        plugins: [
          {
            id: "textCenter",
            beforeDraw: function (chart) {
              let width = chart.width,
                height = chart.height,
                ctx = chart.ctx;
              ctx.restore();
              let fontSize = (height / 114).toFixed(2);
              ctx.font = "bold " + fontSize + "em sans-serif";
              ctx.textBaseline = "middle";

              let text = nowLot,
                textX = Math.round((width - ctx.measureText(text).width) / 2),
                textY = height / 2;

              ctx.fillText(text, textX, textY);
              ctx.save();
            },
          },
        ],
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
