'use client'
import { FlexBoxCentered, FlexBoxColumnCentered } from "@/components/flex-box/flex-box";
import TimerPopover from '@/components/set-timer-popover';
import { useLogin } from '@/hooks/useLogin';
import { createSession } from '@/utils/api/session';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from "react";

export default function Homepage() {
    const [time, setTime] = useState<number>(25 * 60);
    const [endTime, setEndTime] = useState<number>(0 * 60)
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isBreakTime, setIsBreakTime] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const containerRef = useRef<any>(null);
    const { push } = useRouter();
    const { notLoggedInHandler } = useLogin();

    const handleFullscreen = () => {
        if (containerRef.current) {
            if (!document.fullscreenElement) {
                // Enter fullscreen mode
                containerRef.current.requestFullscreen().catch((err: any) => {
                    console.log(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
                });
            } else {
                // Exit fullscreen mode
                document.exitFullscreen().catch((err) => {
                    console.log(`Error attempting to exit full-screen mode: ${err.message} (${err.name})`);
                });
            }
        }
    };

    const handleRoute = (url: string) => {
        const accesstoken = Cookies.get('accesstoken');
        if (accesstoken) {
            push(`/${url}`);
        } else {
            notLoggedInHandler()
        }
    }

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

    const handleTimeEnd = async () => {
        if (isBreakTime) {
            setIsBreakTime(false); // Break time is over
            setTime(25 * 60); // Start the work time
        } else {
            setIsBreakTime(true); // Work period is over, set break time
            await createSession({ end_time: endTime }); // Create a session
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
            <FlexBoxColumnCentered style={{ gap: '1rem' }}>
                <div className="flex">
                    <h2 className={`w-24 h-8 flex items-center justify-center  ${!isBreakTime ? 'bg-[#d5d5d5] text-gray' : 'bg-inherit text-white'}`}>Work time</h2>
                    <h2 className={`w-24 h-8 flex items-center justify-center  ${isBreakTime ? 'bg-[#d5d5d5] text-gray' : 'bg-inherit text-white'}`}>Break!</h2>
                </div>
                <h1 className="text-white text-6xl ">{formatTime(time)}</h1>
                <FlexBoxCentered style={{ gap: '1rem' }}>
                    <button className="w-24 h-10 bg-white rounded transform hover:scale-105 transition-transform duration-200  disabled:bg-gray-600 disabled:hover:scale-100 disabled:active:scale-100 disabled:text-white" disabled={isActive} onClick={handleStart}>Start</button>
                    <button className="w-24 h-10 bg-white rounded transform hover:scale-105 transition-transform duration-200 disabled:bg-gray-600 disabled:hover:scale-100 disabled:active:scale-100 disabled:text-white" disabled={!isActive && !isPaused} onClick={handlePause}>{isPaused ? 'Resume' : 'Pause'}</button>
                    <TimerPopover setTime={setTime} isActive={isActive} setEndTime={setEndTime} />
                </FlexBoxCentered>
            </FlexBoxColumnCentered>
            <div className='flex justify-between px-4'>
                <h2 className='text-white text-xl cursor-pointer' onClick={handleFullscreen}>Full screen</h2>
                <div>
                    <button className='w-24 h-8 bg-white rounded-md text-black' onClick={() => handleRoute('leaderboard')}>Leaderboard</button>

                    <h2 className='text-white text-xl cursor-pointer' onClick={() => handleRoute('session')}>Sessions</h2>
                </div>
            </div>
        </section>
    )
}