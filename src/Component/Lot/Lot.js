import React from "react";
import "./Lot.css";

const Lot = ({ number, state }) => {
  let buttonColor = "#1E4A9F";
  if (state === "abnormal") {
    buttonColor = "#CF3D3D";
  }

  return (
    <button
      style={{
        width: "70px",
        height: "70px",
        backgroundColor: buttonColor,
        borderRadius: "50%",
        border: "none",
        cursor: "pointer",
        color: "white",
        fontSize: "40px",
        fontWeight: "bolder",
      }}>
      {number}
    </button>
  );
};
export default Lot;
