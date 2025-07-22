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

const LOCAL_BIOS = [
  "I shouldnt be alive unless it was for a reason and I finally know what I have to do not just survive but make a difference build something better use my mind my tech my second chance and if needed sacrifice it all to protect what truly matters",
  "They called me a monster said I was broken but I know now this power was never a curse it was a challenge a choice to rise above fear to lead with strength and heart to face the darkness not because I have to but because no one else will",
  "I never asked for this power never wanted the weight of the world on my shoulders but when everything fell apart when no one else stepped up I realized it had to be me I dont fight for revenge or recognition I fight because theres something worth saving because even in the darkest hour someone has to be the light someone has to stand in the gap between chaos and hope and if that means losing my name my past my future then so be it because heroes dont run from pain they rise from it stronger every time",
  "The world told me to run to hide to be afraid but I chose to stand to face the storm with nothing but courage and will because this gift this burden it means I can save lives rewrite fate and if I must fall I will fall saving someone else",
  "I used to think being strong meant hiding your fear burying your pain but now I know true strength is feeling everything and standing anyway its knowing the odds are against you and choosing to fight anyway its walking into the fire not to burn but to protect those who cant fight for themselves and I dont care if no one remembers my name I dont care if the world forgets what I did as long as the people I saved get another chance another breath another tomorrow then its all worth it because thats what being a hero means",
  "They tried to break me bury me forget me but I learned that strength is not about muscles or powers its about standing up when youre broken choosing right when its hard and giving everything for people who may never know your name but still sleep safely because of you",
  "Every scar tells a story every bruise a battle but I keep going not for fame not for glory but because someone has to stand between the innocent and the chaos someone has to be the shield and if that someone is me then I ll never stop never fall",
  "Every great developer you know got there by solving problems they were unqualified to solve until they actually did it",
  "I wasnt born a hero I was born lost scared unsure but when the world needed hope I found purpose not in strength but in the choice to care to fight to never turn away and now I carry that choice with every breath every punch every step I take",
  "They said I was too late too weak too broken but they never saw the fire behind my silence the storm in my soul Im not here to be loved or praised Im here to fight to protect to bleed if I have to and even if I fall I ll rise again until the mission is done"
];

const Char = React.memo(function Char({ char, status, isCaret }) {
  let className = "text-gray-400";
  if (status === "correct") className = "text-gray-100";
  else if (status === "incorrect") className = "text-red-500";
  if (isCaret) return <span className="caret">{char === " " ? " " : char}</span>;
  return <span className={className}>{char === " " ? " " : char}</span>;
});

const TypingComponent = () => {
  const [userInput, setUserInput] = useState("");
  const [targetText, setTargetText] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const wrapperRef = useRef(null);
  const timerRef = useRef(null);

  // Select a random bio from the local array
  const getRandomBio = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * LOCAL_BIOS.length);
    return LOCAL_BIOS[randomIndex].split(/\s+/).slice(0, 40).join(" ");
  }, []);

  // Reset handler
  const handleReset = useCallback(() => {
    setUserInput("");
    setStartTime(null);
    setElapsedTime(0);
    setIsComplete(false);
    setTargetText(getRandomBio());
    wrapperRef.current?.focus();
  }, [getRandomBio]);

  // Initialize target text on mount
  useEffect(() => {
    setTargetText(getRandomBio());
  }, [getRandomBio]);

  // Timer effect
  useEffect(() => {
    if (startTime && !isComplete) {
      timerRef.current = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [startTime, isComplete]);

  // End typing after 30 seconds
  useEffect(() => {
    if (elapsedTime >= 30 && !isComplete) {
      setIsComplete(true);
      clearInterval(timerRef.current);
    }
  }, [elapsedTime, isComplete]);

  // Handle keydown for typing and deletion
  const handleKeyDown = useCallback(
    (e) => {
      if (isComplete || e.ctrlKey || e.altKey || e.metaKey) return;
      const key = e.key;
      setUserInput((prevInput) => {
        let nextInput = prevInput;
        if (!startTime && key.length === 1) setStartTime(Date.now());
        if (key.length === 1 && prevInput.length < targetText.length) {
          nextInput = prevInput + key;
        } else if (key === "Backspace" && prevInput.length > 0) {
          nextInput = prevInput.slice(0, -1);
        }
        if (nextInput.length === targetText.length && !isComplete) setIsComplete(true);
        else if (nextInput.length < targetText.length && isComplete && elapsedTime < 30) setIsComplete(false);
        return nextInput;
      });
      if (key.length === 1 || key === "Backspace") e.preventDefault();
    },
    [targetText.length, startTime, isComplete, elapsedTime]
  );

  // Focus wrapper on mount
  useEffect(() => {
    wrapperRef.current?.focus();
  }, []);

  // Render text with caret
  const characters = useMemo(() => {
    const chars = targetText.split("").map((char, idx) => {
      let status = "untyped";
      if (idx < userInput.length) status = userInput[idx] === targetText[idx] ? "correct" : "incorrect";
      const isCaret = idx === userInput.length;
      return <Char key={idx} char={char} status={status} isCaret={isCaret} />;
    });
    if (userInput.length >= targetText.length) chars.push(<span key="caret-end" className="caret-end" />);
    return chars;
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
