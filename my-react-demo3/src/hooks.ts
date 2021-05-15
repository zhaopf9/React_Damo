import * as React from 'react';

function useCounter() {
  let [number, setNumber] = React.useState(0);
  React.useEffect(() => {
    setInterval(() => {
      setNumber(number => number + 1);
    }, 1000);
  }, []);
  return number;
}

const useMousePosition = () => {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  React.useEffect(() => {
    const updateMouse = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    document.addEventListener('mousemove', updateMouse);
    return () => {
      document.removeEventListener('mousemove', updateMouse);
    };
  });
  return position;
};

export { useCounter, useMousePosition };
