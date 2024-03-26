import React, { useState, useEffect } from "react";

const Clock = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // 1초마다 현재 시간 및 날짜를 업데이트

    return () => clearInterval(interval); // 컴포넌트가 언마운트될 때 clearInterval로 타이머 정리
  }, []);

  return <div>{currentDateTime.toLocaleString()}</div>;
};

export default Clock;
