import { useEffect, useState } from "react";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export default function useKonamiCode() {
  const [activated, setActivated] = useState(false);
  const [keySequence, setKeySequence] = useState([]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      setKeySequence((prev) => {
        const newSeq = [...prev, e.key].slice(-KONAMI_CODE.length);
        if (JSON.stringify(newSeq) === JSON.stringify(KONAMI_CODE)) {
          setActivated(true);
          setTimeout(() => setActivated(false), 5000);
        }
        return newSeq;
      });
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return activated;
}
