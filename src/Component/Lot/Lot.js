import React from "react";
//import "./Lot.css";
import styled from "styled-components";

const LotButton = styled.button`
  width: 70px;
  height: 70px;
  border: none;
  cursor: pointer;
  color: white;
  font-size: 40px;
  font-weight: bolder;
  border-radius: 50%;
  background-color: ${(props) =>
    props.state === "abnormal" ? "#CF3D3D" : "#1E4A9F"};
  &:hover {
    background-color: ${(props) =>
      props.state === "abnormal" ? "#B80000" : "#003366"};
  }
`;

const Lot = ({ number, state }) => {
  return <LotButton state={state}>{number}</LotButton>;
};
export default Lot;
