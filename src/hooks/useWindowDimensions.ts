import { useState, useEffect } from "react";

function getWindowDimensions() {
  const {
    innerWidth: width,
    innerHeight: height,
    pageYOffset: offsetY,
    outerHeight: outerH,
  } = window;
  return {
    width,
    height,
    offsetY,
    outerH,
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}
