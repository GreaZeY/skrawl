import { useEffect, createElement, useState } from "react";
let key = 0;
const CreateSquares = () => {
  const [squares, setSquares] = useState([]);
  useEffect(() => {
    const colors = ["#711c91", "#ea00d9", "#0abdc6", "#133e7c"];
    const height = innerHeight - 20,
      width = innerWidth - 20;
    const createSquare = () => {
      const size = Math.random() * 50;
      const style = {
        width: 20 + size + "px",
        height: 20 + size + "px",
        top: Math.random() * height + "px",
        left: Math.random() * width + "px",
        background: colors[Math.floor(Math.random() * colors.length)],
      };
      const square = createElement("span", {
        style,
        className: "animatedSqure",
        id:key
      });
      key++;
      setSquares((sqr) => [...sqr, square]);

      setTimeout(() => {
        let index = squares.findIndex((sqr) => sqr.props.id === square.props.id-1);
        console.log(squares);
        console.log(index,square);
        if (index === -1) return;
        let sqrs = [...squares];
        console.log(index);
        sqrs.splice(index, 1);
        setSquares(sqrs);
      }, 5000);
    };

    let interval = setInterval(createSquare, 500);
    return () => {
      clearInterval(interval);
    };
  }, [squares]);
  
  return <>{squares}</>;
};

export default CreateSquares;
