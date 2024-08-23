// utils/timerUtils.ts

import { useState, useEffect } from 'react';

/**
 * Hook to handle a countdown timer.
 * @param initialTime - Initial time for the countdown in seconds.
 * @returns [timeLeft, isButtonDisabled, resetTimer]
 */
export const useCountdownTimer = (initialTime: number) => {
  const [timeLeft, setTimeLeft] = useState(initialTime); // Start countdown from the initial time
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // Controls the disable state of the button

  useEffect(() => {
    let timerId: NodeJS.Timeout | null = null;
    if (isButtonDisabled) {
      if (timeLeft > 0) {
        timerId = setInterval(() => {
          setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);
      } else {
        setIsButtonDisabled(false); // Enable the button after the time is up
        setTimeLeft(initialTime); // Reset the timer
      }
    }

    return () => {
      if (timerId) clearInterval(timerId); // Cleanup the interval on component unmount
    };
  }, [timeLeft, isButtonDisabled, initialTime]);

  const resetTimer = () => {
    setIsButtonDisabled(true);
    setTimeLeft(initialTime);
  };

  return [timeLeft, isButtonDisabled, resetTimer] as const;
};

/**
 * Function to format the countdown timer as MM:SS
 * @param seconds - Number of seconds remaining.
 * @returns The formatted time as MM:SS.
 */
export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};
