import { useEffect, useState } from "react";

export default function useGetScreen() {
  const [screen, setScreen] = useState({
    width: 0,
    height: 0,
  });
  useEffect(() => {
    function handleResize() {
      setScreen({ width: window?.innerWidth, height: window?.innerHeight });
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screen;
}
