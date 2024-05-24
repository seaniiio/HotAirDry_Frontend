import React, { useEffect, useState } from "react";
import "./Main.css";
import Lot from "../Component/Lot/Lot";
import Clock from "../Component/Clock/Clock";
import ResultChart from "../Component/ResultChart/ResultChart";
import FeatureChart from "../Component/FeatureChart/FeatureChart";

function Main() {
  const [nowLot, setNowLot] = useState(1);
  const [allNormalProb, setAllNormalProb] = useState([]);
  const [contributions, setContributions] = useState([]);
  const [solution, setSolution] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await fetch("http://127.0.0.1:8000/main/lots");
        const lotsData = await response1.json();
        setAllNormalProb(lotsData.map((prob) => Math.abs(prob - 100)));

        const response2 = await fetch(
          `http://127.0.0.1:8000/main/lot/cont/${nowLot}`
        );
        const contributionData = await response2.json();
        setContributions(contributionData);

        const response3 = await fetch(
          `http://127.0.0.1:8000/main/solution/${nowLot}`
        );
        const solutionData = await response3.json();
        setSolution(solutionData);
        console.log("solution:", solution);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    let interval;
    if (isFetching) {
      fetchData(); // 첫 번째 요청
      interval = setInterval(fetchData, 1000); // 1초 간격으로 요청
    }

    // cleanup 함수 등록하여 컴포넌트가 unmount될 때 interval을 해제
    return () => clearInterval(interval);
  }, [isFetching, nowLot]);

  const clickLotButton = (num) => () => {
    console.log("lot 버튼 클릭:", num, "번");
    setNowLot(num);
  };

  const startFetching = () => {
    const _ = fetch("http://127.0.0.1:8000/main/background");
    setIsFetching(true);
  };

  return (
    <div className="main-container">
      <div className="header-container">
        <p>실시간 공정 이상 모니터링</p>
        <button onClick={startFetching} className="start-button">
          Start Fetching
        </button>
      </div>
      <div className="body-container">
        <div className="lot-container">
          {[...Array(11).keys()].map((num) => (
            <Lot
              key={num + 1}
              number={String(num + 1)}
              state={allNormalProb[num] > 50 ? "abnormal" : "normal"}
              onClick={clickLotButton(num + 1)}
            />
          ))}
        </div>
        <div className="monitor-container">
          <div className="result-container">
            <div className="result-clock-container">
              <Clock />
            </div>
            <div className="result-chart-container">
              <ResultChart
                data={{
                  lot: nowLot,
                  values: [
                    allNormalProb[nowLot - 1],
                    100 - allNormalProb[nowLot - 1],
                  ],
                  colors: ["#CF3D3D", "#1E4A9F"],
                }}
              />
            </div>
            <div className="result-text-container">
              <div>이상 발생 확률</div>
              <div>{allNormalProb[nowLot - 1]}%</div>
            </div>
          </div>
          <div className="result-detail-container">
            <div className="feature-container">
              <div className="feature-title">Feature 1</div>
              <div className="feature-name">온도</div>
              <FeatureChart prob={contributions[0]} />
            </div>
            <div className="feature-container">
              <div className="feature-title">Feature 2</div>
              <div className="feature-name">전류</div>
              <FeatureChart prob={contributions[1]} />
            </div>
            <div className="advice-container">{solution}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
