import React from "react";
import "./Main.css";
import Lot from "../Component/Lot/Lot";
import Clock from "../Component/Clock/Clock";
import ResultChart from "../Component/ResultChart/ResultChart";
import FeatureChart from "../Component/FeatureChart/FeatureChart";

function Main() {
  let nowLot = 0; // 현재 로트 (0 ~ 11)
  let allAbnormalProb = [60, 20, 30, 80, 90, 20, 30, 40, 10, 60, 80]; // 모든 로트 이상 확률

  const chartData = {
    values: [allAbnormalProb[nowLot], 100 - allAbnormalProb[nowLot]],
    colors: ["#CF3D3D", "#1E4A9F"],
  };
  //const abnormalProb = 80;
  const tempContribution = 60;
  const elecContribution = 40;
  const adviceMessage = [
    "온도를 올려주세요",
    "온도를 낮춰주세요",
    "전류를 높여주세요",
    "전류를 낮춰주세요",
  ];
  let nowMessage = 0; // 현재 이상 원인 index

  const isAbnormal = (prob) => {
    if (prob > 50) {
      return "abnormal";
    } else {
      return "normal";
    }
  };

  return (
    <div className="main-container">
      <div className="header-container">
        <p>실시간 공정 이상 모니터링</p>
      </div>
      <div className="body-container">
        <div className="lot-container">
          <Lot number="1" state={isAbnormal(allAbnormalProb[0])}></Lot>
          <Lot number="2" state={isAbnormal(allAbnormalProb[1])}></Lot>
          <Lot number="3" state={isAbnormal(allAbnormalProb[2])}></Lot>
          <Lot number="4" state={isAbnormal(allAbnormalProb[3])}></Lot>
          <Lot number="5" state={isAbnormal(allAbnormalProb[4])}></Lot>
          <Lot number="6" state={isAbnormal(allAbnormalProb[5])}></Lot>
          <Lot number="7" state={isAbnormal(allAbnormalProb[6])}></Lot>
          <Lot number="8" state={isAbnormal(allAbnormalProb[7])}></Lot>
          <Lot number="9" state={isAbnormal(allAbnormalProb[8])}></Lot>
          <Lot number="10" state={isAbnormal(allAbnormalProb[9])}></Lot>
          <Lot number="11" state={isAbnormal(allAbnormalProb[10])}></Lot>
        </div>
        <div className="monitor-container">
          <div className="result-container">
            <div className="result-clock-container">
              <Clock />
            </div>
            <div className="result-chart-container">
              <ResultChart data={chartData} />
            </div>
            <div className="result-text-container">
              <div>이상 발생 확률</div>
              <div>{allAbnormalProb[nowLot]}%</div>
            </div>
          </div>
          <div className="result-detail-container">
            <div className="feature-container">
              <div className="feature-title">Feature 1</div>
              <div className="feature-name">온도</div>
              <FeatureChart prob={tempContribution}></FeatureChart>
            </div>
            <div className="feature-container">
              <div className="feature-title">Feature 2</div>
              <div className="feature-name">전류</div>
              <FeatureChart prob={elecContribution}></FeatureChart>
            </div>
            <div className="advice-container">{adviceMessage[nowMessage]}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Main;
