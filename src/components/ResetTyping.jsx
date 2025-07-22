import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";

function ResetTyping({ onReset, theme }) {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Enter') {
                onReset();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onReset]);
    return (
        <div className="flex flex-col justify-center items-center mt-4 ">
            <button
                className={`text-2xl cursor-pointer rounded-lg py-2 px-3 transition-all duration-300
                    ${theme === 'light'
                        ? 'bg-white text-[#1d1e1e] hover:bg-[#f3ede7]'
                        : 'text-[#eeeeee] bg-[#27272a] hover:bg-[#3f3f46]'}
                `}
                style={theme === 'light' ? { background: '#fff', color: '#1d1e1e' } : {}}
                onClick={onReset}
            >
                <FontAwesomeIcon icon={faRotateRight} style={{ color: theme === 'light' ? '#1d1e1e' : '#eeeeee' }} />
            </button>
            <span className={`mt-2 text-sm ${theme === 'light' ? 'text-[#1d1e1e]' : 'text-gray-400'}`}>Enter to Reset</span>
        </div>
        
    )
}

export default ResetTyping;