'use client'
import { FlexBoxCentered, FlexBoxColumnCentered } from "@/components/flex-box/flex-box";
import TimerPopover from '@/components/set-timer-popover';
import { createSession } from '@/utils/api/session';
import Cookies from 'js-cookie';
import { useEffect, useRef, useState } from "react";

export default function Homepage() {
    const [time, setTime] = useState<number>(25 * 60);
    const [endTime, setEndTime] = useState<number>(0 * 60)
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isBreakTime, setIsBreakTime] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const containerRef = useRef<any>(null);
    const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
    const accesstoken = Cookies.get('accesstoken')

    const handleFullscreen = () => {
        if (containerRef.current) {
            if (!document.fullscreenElement) {
                // Enter fullscreen mode
                containerRef.current.requestFullscreen().catch((err: any) => {
                    console.log(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
                    setIsFullScreen(false)
                });
                setIsFullScreen(true)
            } else {
                // Exit fullscreen mode
                document.exitFullscreen().catch((err) => {
                    console.log(`Error attempting to exit full-screen mode: ${err.message} (${err.name})`);
                });
                setIsFullScreen(false)
            }
        }
    };

    useEffect(() => {
        let interval: any;
        if (isActive && time > 0) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
        } else if (time === 0) {
            handleTimeEnd();
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);


    }, [isActive, time]);

    const handleStart = () => {
        setIsActive(true);
        setIsPaused(false);
    };

    const handlePause = () => {
        if (!isPaused) {
            setIsActive(false)
            setIsPaused(true);
        } else {
            setIsActive(true);
            setIsPaused(false);
        }
    }

    const handleTimeEnd = async () => {
        if (isBreakTime) {
            setIsBreakTime(false); // Break time is over
            setTime(25 * 60); // Start the work time
        } else {
            setIsBreakTime(true); // Work period is over, set break time
            if (accesstoken) {
                await createSession({ end_time: endTime }); // Create a session
            }
            setTime(5 * 60); // Set the break time (changed to 5 minutes for standard Pomodoro)
        }
        setIsActive(false); // Automatically pause the timer
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes < 10 ? '0' : ''}${minutes} : ${seconds < 10 ? '0' : ''}${seconds}`
    }



    return (
        <section ref={containerRef} className='flex flex-col justify-around w-full'>
            <FlexBoxColumnCentered>
                <div className="flex">
                    <h2 className={`w-24 h-8 flex items-center justify-center rounded-2xl  ${!isBreakTime ? 'bg-[#777777] text-gray' : 'bg-inherit text-white'}`}>Work time</h2>
                    <h2 className={`w-24 h-8 flex items-center justify-center rounded-2xl  ${isBreakTime ? 'bg-[#777777] text-gray' : 'bg-inherit text-white'}`}>Break!</h2>
                </div>
                <h1 className={`text-[#777777] text-[16rem] font-semibold text-center font-Bebas_Neue`}>{formatTime(time)}</h1>
                <FlexBoxCentered style={{ gap: '1rem' }}>
                    <button className="w-24 h-10 bg-yellow-300 rounded-3xl font-medium transform hover:scale-105 transition-transform duration-200  disabled:bg-gray-600 disabled:hover:scale-100 disabled:active:scale-100 disabled:text-white" disabled={isActive} onClick={handleStart}>Start</button>
                    <button className="w-24 h-10 bg-yellow-300 rounded-3xl font-medium transform hover:scale-105 transition-transform duration-200 disabled:bg-gray-600 disabled:hover:scale-100 disabled:active:scale-100 disabled:text-white" disabled={!isActive && !isPaused} onClick={handlePause}>{isPaused ? 'Resume' : 'Pause'}</button>
                    <TimerPopover setTime={setTime} isActive={isActive} setEndTime={setEndTime} />
                </FlexBoxCentered>
            </FlexBoxColumnCentered>
            <button className={ `cursor-pointer rounded-3xl absolute group overflow-hidden w-max ${isFullScreen ? 'bottom-4 left-4' : 'relative left-4 bottom-1'} px-8 py-2 border-yellow-300` } onClick={handleFullscreen}>
                <span className="font-bold text-black text-xl relative z-10 group-hover:text-yellow-300 duration-500">Full screen</span>
                <span className="absolute top-0 left-0 w-full bg-yellow-300 duration-500 group-hover:-translate-x-full h-full"></span>
                <span className="absolute top-0 left-0 w-full bg-yellow-300 duration-500 group-hover:translate-x-full h-full"></span>

                <span className="absolute top-0 left-0 w-full bg-yellow-300 duration-500 delay-300 group-hover:-translate-y-full h-full"></span>
                <span className="absolute delay-300 top-0 left-0 w-full bg-yellow-300 duration-500 group-hover:translate-y-full h-full"></span>
            </button>
        </section>
    )
}