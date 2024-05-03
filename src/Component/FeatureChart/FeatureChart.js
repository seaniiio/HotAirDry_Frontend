import React from "react";
import "./FeatureChart.css";

const BarGraph = ({ prob }) => {
  // 비율이 0에서 1 사이로 표현되는 것을 퍼센트로 변환
  console.log("prob:", prob);
  const redWidth = `${100 * prob}%`;
  const blueWidth = `${100 - 100 * prob}%`;

  return (
    <div className="bar-graph">
      <div className="bar red" style={{ width: redWidth }}></div>
      <div className="bar blue" style={{ width: blueWidth }}></div>
    </div>
  );
};

export default BarGraph;
