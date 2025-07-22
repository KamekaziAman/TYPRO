import React, { useState, useEffect } from 'react'


const KEY_MAP = {
  Backspace: 'Backspace',
  Enter: 'Enter',
  Control: 'Ctrl',
  ' ': 'Space',
};

function Keyboard({ isMuted }) {
    const [activeKey, setActiveKey] = useState(null);
    const audioRef = React.useRef(null);
  
    const keyClass = (key) =>
      `keyboard-key w-16 h-16 bg-[#232323] text-gray-300 rounded-2xl font-bold text-2xl flex items-center justify-center transition-all duration-80 ${
        activeKey === key ? 'ring-3 ring-[#ecff5c] ring-offset-2 outline-none' : ''
      }`;
  
    const playClick = () => {
      if (audioRef.current && !isMuted) {
        audioRef.current.volume = 0.6;
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    };
    

    useEffect(() => {
        const handleDown = (e) => {
          let key = e.key.toUpperCase();
          if (KEY_MAP[e.key]) key = KEY_MAP[e.key];
          if (key === 'CONTROL') key = 'Ctrl';
          if (key === ' ') key = 'Space';
          if (key.length === 1 && key.match(/[A-Z]/)) {
            setActiveKey(key);
            if (!isMuted) playClick();
          } else if (["Backspace", "Enter", "Ctrl", "Space"].includes(key)) {
            setActiveKey(key);
            if (!isMuted) playClick();
          }
        };
      
        const handleUp = () => setActiveKey(null);
      
        window.addEventListener('keydown', handleDown);
        window.addEventListener('keyup', handleUp);
      
        return () => {
          window.removeEventListener('keydown', handleDown);
          window.removeEventListener('keyup', handleUp);
        };
      }, [isMuted]);

    return (
        <div className="keyboard bg-[#181818] p-6 rounded-2xl shadow-2xl max-w-4xl mx-auto mt-4 select-none">
            {/* Audio element for click sound */}
            <audio ref={audioRef} src="/sounds/click.mp3" preload="auto" />
            <div className="keyboard-row flex justify-center gap-4 mb-4">
                {['Q','W','E','R','T','Y','U','I','O','P'].map((key) => (
                    <button key={key} className={keyClass(key)} onClick={() => { setActiveKey(key); playClick(); }}>{key}</button>
                ))}
                <button className={keyClass('Backspace') + ' w-20 ml-3'} onClick={() => { setActiveKey('Backspace'); playClick(); }}>&larr;</button>
            </div>
            <div className="keyboard-row flex justify-center gap-4 mb-4">
                {['A','S','D','F','G','H','J','K','L'].map((key) => (
                    <button key={key} className={keyClass(key)} onClick={() => { setActiveKey(key); playClick(); }}>{key}</button>
                ))}
                <button className={keyClass('Enter') + ' w-28 ml-3'} onClick={() => { setActiveKey('Enter'); playClick(); }}>Enter</button>
            </div>
            <div className="keyboard-row flex justify-center gap-4">
                <button className={keyClass('Ctrl') + ' w-20'} onClick={() => { setActiveKey('Ctrl'); playClick(); }}>Ctr</button>
                {['Z','X','C','V','B','N','M'].map((key) => (
                    <button key={key} className={keyClass(key)} onClick={() => { setActiveKey(key); playClick(); }}>{key}</button>
                ))}
                <button className={keyClass('Space') + ' w-40 ml-3'} onClick={() => { setActiveKey('Space'); playClick(); }}>Space</button>
            </div>
        </div>
    )
}

export default Keyboard;