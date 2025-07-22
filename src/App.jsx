import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import TypingComponent from "./components/TypingComponent.jsx";
import Keyboard from "./components/Keyboard.jsx";
import Footer from "./components/Footer.jsx";
import Phone from "./Phone.jsx";
import About from "./components/About.jsx";

function App() {
  const [isMuted, setIsMuted] = useState(() => {
    const stored = localStorage.getItem("isMuted");
    return stored === null ? false : JSON.parse(stored);
  });
  const [showKeyboard, setShowKeyboard] = useState(true);
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    localStorage.setItem("isMuted", JSON.stringify(isMuted));
  }, [isMuted]);

  return (
    <BrowserRouter>
      <div
        className={`flex flex-col min-h-screen ${
          theme === "light" ? "theme-light" : ""
        }`}
        style={
          theme === "light" ? { background: "#fff9f2", color: "#1d1e1e" } : {}
        }
      >
        <Navbar
          isMuted={isMuted}
          setIsMuted={setIsMuted}
          showKeyboard={showKeyboard}
          setShowKeyboard={setShowKeyboard}
          theme={theme}
          toggleTheme={toggleTheme}
        />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Phone theme={theme} />
                <div className="flex-grow md:block hidden">
                  <TypingComponent />
                  {showKeyboard && <Keyboard isMuted={isMuted} />}
                </div>
              </>
            }
          />
          <Route exact path="/about" element={<About theme={theme} />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
