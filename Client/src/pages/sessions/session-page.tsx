'use client'

import { getAllSessions } from '@/utils/api/session'
import { useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'

export default function SessionsView () {
    const token = Cookies.get('accesstoken')
    const sessions = useQuery({
        queryKey: ['sessions', token],
        queryFn: () => getAllSessions(),
        retry: false,
    })

    return (
        <>
            <h1 className='text-4xl text-white text-center'>Sessions</h1>
            { sessions?.data?.data?.length > 0 ?
                sessions?.data?.data?.map((session:any) => (
                       <div key={session.label} className='flex w-48 gap-5'>
                           <h1 className='text-white text-xl'>{session.label}</h1>
                           <h1 className='text-white text-xl'>Session time : {session.end_time}</h1> 
                       </div>
                )) : (
                    <h1 className='text-white text-center'>You havent completed any sessions</h1>
                )
            }
        </>
    )
} 