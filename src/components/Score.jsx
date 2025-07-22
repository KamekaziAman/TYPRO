import React from "react";

function Score({ userInput, targetText, elapsedTime, isComplete }) {
    // Calculate correct characters
    let correctChars = 0;
    for (let i = 0; i < userInput.length; i++) {
        if (userInput[i] === targetText[i]) correctChars++;
    }
    // WPM: (chars / 5) / (minutes)
    const minutes = elapsedTime / 60;
    const wpm = minutes > 0 ? Math.round((userInput.length / 5) / minutes) : 0;
    // Accuracy: (correct / typed) * 100
    const accuracy = userInput.length > 0 ? Math.round((correctChars / userInput.length) * 100) : 0;
    // Countdown display (30 - elapsedTime)
    const countdown = Math.max(0, 30 - elapsedTime);
    const timeDisplay = countdown < 10 ? `0${countdown}` : `${countdown}`;
    return (
        <>
          <div className="font-poppins font-extrabold flex items-center mt-20 mb-1 max-w-4xl mx-auto justify-between">
            <div className="text-4xl text-[#ecff5c]">{timeDisplay}</div>
            <div className="flex justify-center items-center gap-4">
                <div className="text-white text-2xl">WPM: {wpm}</div>
                <div className="text-white text-2xl">Accuracy: {accuracy}%</div>
            </div>
          </div>
        </>
    )
}

export default Score;