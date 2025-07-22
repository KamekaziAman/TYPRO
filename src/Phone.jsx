import React from 'react'

function Phone({ theme }) {
    return (
        <div className='md:hidden block h-screen flex justify-center items-center'>
            <h1 className={`text-2xl font-logo ${theme === 'light' ? 'text-[#1d1e1e]' : 'text-white'}`}>Open the Site on Desktop</h1>
        </div>
    )
}

export default Phone;