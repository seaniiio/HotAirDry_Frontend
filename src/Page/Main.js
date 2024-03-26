import React from "react";
import "./Main.css";
import Lot from "../Component/Lot/Lot";

function Main() {
  return (
    <div className="main-container">
      <div className="header-container">
        <p>실시간 공정 이상 모니터링</p>
      </div>
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
    </div>
  );
}
export default Main;
