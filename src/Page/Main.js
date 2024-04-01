import { React, useState } from "react";
import "./Main.css";
import Lot from "../Component/Lot/Lot";
import Clock from "../Component/Clock/Clock";
import ResultChart from "../Component/ResultChart/ResultChart";
import FeatureChart from "../Component/FeatureChart/FeatureChart";

function Main() {
  let [nowLot, setNowLot] = useState(0);
  let allAbnormalProb = [20, 30, 80, 90, 20, 30, 40, 10, 60, 80, 100]; // 모든 로트 이상 확률

  const chartData = {
    lot: nowLot,
    values: [allAbnormalProb[nowLot - 1], 100 - allAbnormalProb[nowLot - 1]],
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

  const clickLotButton = (num) => {
    return () => {
      console.log("lot 버튼 클릭:", num, "번");
      setNowLot(num);
    };
  };

  return (
    <div className="main-container">
      <div className="header-container">
        <p>실시간 공정 이상 모니터링</p>
      </div>
      <div className="body-container">
        <div className="lot-container">
          <Lot
            number="1"
            state={isAbnormal(allAbnormalProb[0])}
            onClick={clickLotButton(1)}></Lot>
          <Lot
            number="2"
            state={isAbnormal(allAbnormalProb[1])}
            onClick={clickLotButton(2)}></Lot>
          <Lot
            number="3"
            state={isAbnormal(allAbnormalProb[2])}
            onClick={clickLotButton(3)}></Lot>
          <Lot
            number="4"
            state={isAbnormal(allAbnormalProb[3])}
            onClick={clickLotButton(4)}></Lot>
          <Lot
            number="5"
            state={isAbnormal(allAbnormalProb[4])}
            onClick={clickLotButton(5)}></Lot>
          <Lot
            number="6"
            state={isAbnormal(allAbnormalProb[5])}
            onClick={clickLotButton(6)}></Lot>
          <Lot
            number="7"
            state={isAbnormal(allAbnormalProb[6])}
            onClick={clickLotButton(7)}></Lot>
          <Lot
            number="8"
            state={isAbnormal(allAbnormalProb[7])}
            onClick={clickLotButton(8)}></Lot>
          <Lot
            number="9"
            state={isAbnormal(allAbnormalProb[8])}
            onClick={clickLotButton(9)}></Lot>
          <Lot
            number="10"
            state={isAbnormal(allAbnormalProb[9])}
            onClick={clickLotButton(10)}></Lot>
          <Lot
            number="11"
            state={isAbnormal(allAbnormalProb[10])}
            onClick={clickLotButton(11)}></Lot>
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
              <div>{allAbnormalProb[nowLot - 1]}%</div>
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
