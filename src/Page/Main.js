import { React, useEffect, useState } from "react";
import "./Main.css";
import Lot from "../Component/Lot/Lot";
import Clock from "../Component/Clock/Clock";
import ResultChart from "../Component/ResultChart/ResultChart";
import FeatureChart from "../Component/FeatureChart/FeatureChart";

function Main() {
  let [nowLot, setNowLot] = useState(0);
  let [AllNormalProb, setAllNormalProb] = useState([]);
  let [contributions, setContributions] = useState([]); // [온도 기여도, 전류 기여도]
  let [solution, setSolution] = useState("");

  useEffect(() => {
    // 모든 로트의 정상 확률 불러오기
    fetch("http://127.0.0.1:8000/main/lots", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        setAllNormalProb(response.map((prob) => Math.abs(prob - 100)));
      });

    // 현재 로트의 공정변수별 기여도, 솔루션 불려오기
    fetch(`http://127.0.0.1:8000/main/lot/cont/${nowLot}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        setContributions(response);
      });

    // 현재 로트의 솔루션 불러오기
    fetch(`http://127.0.0.1:8000/main/solution/${nowLot}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        setSolution(response);
      });
  }, [nowLot]);

  // let allTempAbnormalProb = [30, 70, 80, 10, 60, 40, 50, 80, 20, 40, 90]; // 로트별 온도 비정상 확률
  // let allCurrentAbnormalProb = [10, 20, 90, 50, 20, 50, 0, 80, 90, 70, 100]; // 로트별 전류 비정상 확률
  let adviceMessageIdx = [1, 2, 3, 1, 2, 2, 0, 3, 2, 3, 1]; // 메시지 출력 idx

  const chartData = {
    lot: nowLot,
    values: [AllNormalProb[nowLot - 1], 100 - AllNormalProb[nowLot - 1]],
    colors: ["#CF3D3D", "#1E4A9F"],
  };
  //const abnormalProb = 80;
  //   const tempContribution = 60;
  //   const elecContribution = 40;
  const adviceMessage = [
    "온도를 올려주세요",
    "온도를 낮춰주세요",
    "전류를 높여주세요",
    "전류를 낮춰주세요",
    "",
  ];
  // let nowMessage = 0; // 현재 이상 원인 index

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
            state={isAbnormal(AllNormalProb[0])}
            onClick={clickLotButton(1)}></Lot>
          <Lot
            number="2"
            state={isAbnormal(AllNormalProb[1])}
            onClick={clickLotButton(2)}></Lot>
          <Lot
            number="3"
            state={isAbnormal(AllNormalProb[2])}
            onClick={clickLotButton(3)}></Lot>
          <Lot
            number="4"
            state={isAbnormal(AllNormalProb[3])}
            onClick={clickLotButton(4)}></Lot>
          <Lot
            number="5"
            state={isAbnormal(AllNormalProb[4])}
            onClick={clickLotButton(5)}></Lot>
          <Lot
            number="6"
            state={isAbnormal(AllNormalProb[5])}
            onClick={clickLotButton(6)}></Lot>
          <Lot
            number="7"
            state={isAbnormal(AllNormalProb[6])}
            onClick={clickLotButton(7)}></Lot>
          <Lot
            number="8"
            state={isAbnormal(AllNormalProb[7])}
            onClick={clickLotButton(8)}></Lot>
          <Lot
            number="9"
            state={isAbnormal(AllNormalProb[8])}
            onClick={clickLotButton(9)}></Lot>
          <Lot
            number="10"
            state={isAbnormal(AllNormalProb[9])}
            onClick={clickLotButton(10)}></Lot>
          <Lot
            number="11"
            state={isAbnormal(AllNormalProb[10])}
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
              <div>{AllNormalProb[nowLot - 1]}%</div>
            </div>
          </div>
          <div className="result-detail-container">
            <div className="feature-container">
              <div className="feature-title">Feature 1</div>
              <div className="feature-name">온도</div>
              <FeatureChart prob={contributions[0]}></FeatureChart>
            </div>
            <div className="feature-container">
              <div className="feature-title">Feature 2</div>
              <div className="feature-name">전류</div>
              <FeatureChart prob={contributions[1]}></FeatureChart>
            </div>
            <div className="advice-container">
              {adviceMessage[adviceMessageIdx[nowLot - 1]]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Main;
