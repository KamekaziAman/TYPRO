import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import "./CSS/TypingComponent.css";
import ResetTyping from "./ResetTyping";
import Score from "./Score";

const Char = React.memo(function Char({ char, status, isCaret }) {
  const displayChar = char === " " ? " " : char;
  let className = "text-gray-400";
  if (status === "correct") {
    className = "text-gray-100";
  } else if (status === "incorrect") {
    className = "text-red-500";
  }

  if (isCaret) {
    return <span className="caret">{displayChar}</span>;
  }

  return <span className={className}>{displayChar}</span>;
});

const TypingComponent = () => {
  const [userInput, setUserInput] = useState("");
  const [targetText, setTargetText] = useState("");
  const wrapperRef = useRef(null);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const timerRef = useRef(null);

  // Fetch and set a random bio
  const fetchRandomBio = useCallback(() => {
    fetch("https://api.quotable.io/authors?sortBy=name&order=asc")
      .then((res) => res.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.results.length);
          let bio = data.results[randomIndex].bio || "";
          // Remove punctuation, en dash, and numbers
          bio = bio.replace(/[0-9.,/#!$%^&*;:{}=\-_`~()"'?<>\[\]|–]/g, "");
          // Limit to 40 words
          const words = bio.split(/\s+/).filter(Boolean);
          bio = words.slice(0, 40).join(" ");
          setTargetText(bio);
        }
      })
      .catch((err) => {
        setTargetText("");
      });
  }, []);

  useEffect(() => {
    fetchRandomBio();
  }, [fetchRandomBio]);

  // Timer effect
  useEffect(() => {
    if (startTime && !isComplete) {
      timerRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        setElapsedTime(elapsed);
        if (elapsed >= 30) {
          setIsComplete(true);
          clearInterval(timerRef.current);
        }
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [startTime, isComplete]);

  // Handle keydown for typing and deletion (caret always at end)
  const handleKeyDown = useCallback(
    (e) => {
      if (isComplete) return; // Block input if complete or time's up
    if (e.ctrlKey || e.altKey || e.metaKey) return;
    const key = e.key;
    setUserInput((prevInput) => {
        // Start timer on first key press
        if (!startTime && key.length === 1) {
          setStartTime(Date.now());
        }
        let nextInput = prevInput;
      if (key.length === 1 && prevInput.length < targetText.length) {
          nextInput = prevInput + key;
      } else if (key === "Backspace" && prevInput.length > 0) {
          nextInput = prevInput.slice(0, -1);
        }
        // If completed
        if (nextInput.length === targetText.length && !isComplete) {
          setIsComplete(true);
        } else if (nextInput.length < targetText.length && isComplete && elapsedTime < 30) {
          setIsComplete(false);
      }
        return nextInput;
    });
    // Prevent default for handled keys
    if (key.length === 1 || key === "Backspace") {
      e.preventDefault();
    }
    },
    [targetText.length, startTime, isComplete, elapsedTime]
  );

  useEffect(() => {
    wrapperRef.current?.focus();
  }, []);

  // Reset handler for the reset button
  const handleReset = useCallback(() => {
    setUserInput("");
    setStartTime(null);
    setElapsedTime(0);
    setIsComplete(false);
    fetchRandomBio();
    wrapperRef.current?.focus();
  }, [fetchRandomBio]);

  // Render text with caret always at the end of userInput
  const characters = useMemo(() => {
    const characterSpans = targetText.split("").map((char, index) => {
      let status = "untyped";
      if (index < userInput.length) {
        status = userInput[index] === targetText[index] ? "correct" : "incorrect";
    }
      const isCaret = index === userInput.length;
      return <Char key={index} char={char} status={status} isCaret={isCaret} />;
    });

    if (userInput.length >= targetText.length) {
      characterSpans.push(<span key="caret-end" className="caret-end" />);
    }

    return characterSpans;
  }, [userInput, targetText]);

  return (
    <>
      <Score userInput={userInput} targetText={targetText} elapsedTime={elapsedTime} isComplete={isComplete} />
    <div
      ref={wrapperRef}
        className="flex items-center justify-center px-4"
      onClick={() => wrapperRef.current?.focus()}
        onKeyDown={handleKeyDown}
      tabIndex={0}
      style={{ outline: "none" }}
    >
        
      <div
        className="typing-area text-lg font-mono text-gray-400 leading-relaxed max-w-4xl cursor-text"
        style={{
          whiteSpace: "normal",
          wordBreak: "break-word",
          overflowWrap: "break-word",
            paddingTop: "4px",
        }}
      >
        {characters}
      </div>
        
    </div>
      <ResetTyping onReset={handleReset} />
    </>
  );
};

export default TypingComponent;
