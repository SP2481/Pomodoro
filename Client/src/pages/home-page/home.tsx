'use client'
import { FlexBoxCentered, FlexBoxColumnCentered } from "@/components/flex-box/flex-box";
import TimerPopover from '@/components/set-timer-popover';
import { useEffect, useState } from "react";

export default function Homepage() {
    const [time, setTime] = useState<number>(25 * 60);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isBreakTime, setIsBreakTime] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(false);

    useEffect(() => {
        let interval: any;
        if (isActive) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime - 1)
            }, 1000)
        } else {
            clearInterval(interval);
        }
        if (time === 0) {
            if (isBreakTime) {
                setIsBreakTime(false); // break time is over
                setTime(25 * 60); // start the work time
            } else {
                setIsBreakTime(true); // work period is over set break time to true
                setTime(1 * 60); // set the break time 
            }
            setIsActive(true)
        }

        return () => clearInterval(interval)

    }, [isActive, time, isBreakTime, isPaused]);

    const handleStart = () => {
        setIsActive(true);
        setIsPaused(false);
    }
    const handlePause = () => {
        if (!isPaused) {
            setIsActive(false)
            setIsPaused(true);
        } else {
            setIsActive(true);
            setIsPaused(false);
        }
    }

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes < 10 ? '0' : ''}${minutes} : ${seconds < 10 ? '0' : ''}${seconds}`
    }



    return (
        <section>
            <FlexBoxColumnCentered style={{ gap: '1rem' }}>
                <div className="flex">
                    <h2 className={`w-24 h-8 flex items-center justify-center  ${!isBreakTime ? 'bg-[#d5d5d5] text-gray' : 'bg-inherit text-white'}`}>Work time</h2>
                    <h2 className={`w-24 h-8 flex items-center justify-center  ${isBreakTime ? 'bg-[#d5d5d5] text-gray' : 'bg-inherit text-white'}`}>Break!</h2>
                </div>
                <h1 className="text-white text-6xl ">{formatTime(time)}</h1>
                <FlexBoxCentered style={{ gap: '1rem' }}>
                    <button className="w-24 h-10 bg-white rounded transform hover:scale-105 transition-transform duration-200  disabled:bg-gray-600 disabled:hover:scale-100 disabled:active:scale-100 disabled:text-white" disabled={isActive} onClick={handleStart}>Start</button>
                    <button className="w-24 h-10 bg-white rounded transform hover:scale-105 transition-transform duration-200 disabled:bg-gray-600 disabled:hover:scale-100 disabled:active:scale-100 disabled:text-white" disabled={!isActive && !isPaused} onClick={handlePause}>{isPaused ? 'Resume' : 'Pause'}</button>
                    <TimerPopover setTime={setTime} isActive={isActive}/>
                </FlexBoxCentered>
            </FlexBoxColumnCentered>
        </section>
    )
}