import React from "react";
import "./Lot.css";

const Lot = ({ number, state }) => {
  let buttonColor = state === "abnormal" ? "abnormal" : "normal";

  return (
    <button
      className={`lot-button ${buttonColor}`}
      style={{
        backgroundColor: state === "abnormal" ? "#CF3D3D" : "#1E4A9F",
      }}>
      {number}
    </button>
  );
};
export default Lot;
