import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";
import {
  faKeyboard,
  faMoon,
  faCircleInfo,
  faVolumeHigh,
  faVolumeXmark,
} from "@fortawesome/free-solid-svg-icons";

function Navbar({ isMuted, setIsMuted, showKeyboard, setShowKeyboard, theme, toggleTheme }) {
  const VolumeChangeIcon = () => {
    setIsMuted((prev) => !prev);
  };
  const location = useLocation();

  const handleKeyboardToggle = () => {
    setShowKeyboard((prev) => !prev);
  };

  return (
    <div className="w-full flex justify-between items-center p-2 px-10 border-b border-[#eeeeee] text-[#eeeeee]">
      <div className="font-logo font-bold text-3xl cursor-wait">
        <Link to="/">TYPRO</Link>
      </div>
      <div className="flex items-center gap-8 text-2xl">
        <span className="cursor-pointer" onClick={handleKeyboardToggle} title={showKeyboard ? "Hide Keyboard" : "Show Keyboard"}>
          <FontAwesomeIcon icon={faKeyboard} className={showKeyboard ? "" : "text-gray-600"} />
        </span>
        <span className="cursor-pointer" onClick={toggleTheme} title="Toggle Theme">
          <FontAwesomeIcon icon={faMoon} className={theme === "light" ? "text-[#1d1e1e]" : ""} />
        </span>
        <span className="cursor-pointer" onClick={VolumeChangeIcon} title={isMuted ? "Unmute" : "Mute"}>
          <FontAwesomeIcon icon={isMuted ? faVolumeXmark : faVolumeHigh} />
        </span>
        <Link to="/about" className={location.pathname === "/about" ? "text-[#ecff5c]" : ""}>
          <span className="cursor-pointer">
            <FontAwesomeIcon icon={faCircleInfo} />
          </span>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
