import { useEffect, useState } from "react";

export default function CountdownScreen({ onFinish }) {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count === 0) {
      const whistle = new Audio("/sounds/whistle.mp3");
      whistle.play();

      setTimeout(() => {
        onFinish();
      }, 1000);

      return;
    }

    const timer = setTimeout(() => {
      setCount(c => c - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count, onFinish]);

  return (
    <div style={screenStyle}>
      <div style={numberStyle}>
        {count === 0 ? "PLAY ON!" : count}
      </div>
    </div>
  );
}

const screenStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  fontSize: "120px",
  fontWeight: "bold",
  color: "#111"
};


const numberStyle = {
  animation: "pop 1s ease"
};
