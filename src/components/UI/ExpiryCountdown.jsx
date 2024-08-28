import React, { useState } from 'react';

const ExpiryCountdown = ({ expiryDate }) => {

    const [timeRemaining, setTimeRemaining] = useState(getTimeRemainingString())

    function getTimeRemainingString() {
        let timeLeft = expiryDate - Date.now()
        let seconds = Math.floor((timeLeft / 1000) % 60)
        let minutes = Math.floor((timeLeft / 60000) % 60)
        let hours = Math.floor((timeLeft / 60000) / 60)
        return (`${hours}h ${minutes}m ${seconds}s`)
    }

    setInterval(() => {
        setTimeRemaining(getTimeRemainingString())
    },1000)
    
    return (
        <div className="de_countdown">{timeRemaining}</div>
    );
}

export default ExpiryCountdown;
