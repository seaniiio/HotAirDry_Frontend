import React from "react";
import "./Main.css";
import Lot from "../Component/Lot/Lot";
import Clock from "../Component/Clock/Clock";

function Main() {
  return (
    <div className="main-container">
      <div className="header-container">
        <p>실시간 공정 이상 모니터링</p>
      </div>
      <div className="body-container">
        <div className="lot-container">
          <Lot number="1" state="normal"></Lot>
          <Lot number="2" state="abnormal"></Lot>
          <Lot number="3" state="normal"></Lot>
          <Lot number="4" state="abnormal"></Lot>
          <Lot number="5" state="normal"></Lot>
          <Lot number="6" state="abnormal"></Lot>
          <Lot number="7" state="normal"></Lot>
          <Lot number="8" state="abnormal"></Lot>
          <Lot number="9" state="normal"></Lot>
          <Lot number="10" state="abnormal"></Lot>
          <Lot number="11" state="normal"></Lot>
        </div>
        <div className="monitor-container">
          <div className="result-container">
            <div className="result-clock-container">
              <Clock />
            </div>
          </div>
          <div className="result-detail-container">
            <div className="feature-container-1">온도</div>
            <div className="feature-container-2">전류</div>
            <div className="advice-container">온도를 올려주세요</div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Main;
