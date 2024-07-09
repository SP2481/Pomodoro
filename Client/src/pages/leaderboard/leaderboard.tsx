'use client'
import { getLeaderboard } from '@/utils/api/leaderboard'
import { useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'


export const LeaderboardView = () => {
    const token = Cookies.get('accesstoken')
    const { data } = useQuery({
        queryKey: ['leaderboard', token],
        queryFn: () => getLeaderboard(),
        retry: false,
    })
    console.log(data);
    return (
                <div className='text-7xl text-white text-center'>
                    <h1>LeaderBoard</h1>
                    {
                        data?.data?.leaderboard.map((user:any) => (
                            <div key={user.user_id} className='flex justify-center gap-4'>
                                <h3 className='text-sm'>email :{user.userDetails.email}</h3>
                                <h3 className='text-sm'>rank :{user.rank}</h3>
                                <h3 className='text-sm'> total_sessions : {user.total_sessions}</h3>
                            </div>
                        ))
                    }
                    <h2>Your rank</h2>
                    <div className='flex justify-center gap-4'>
                                <h3 className='text-sm'>email :{data.data.userRank.userDetails.email}</h3>
                                <h3 className='text-sm'>rank :{data.data.userRank.rank}</h3>
                                <h3 className='text-sm'> total_sessions : {data.data.userRank.total_sessions}</h3>
                            </div>
                </div>
    )
}