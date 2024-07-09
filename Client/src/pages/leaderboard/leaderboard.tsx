import { getLeaderboard } from '@/utils/api/leaderboard'
import { useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'


export const LeaderboardView = () => {
    const token = Cookies.get('accesstoken')
    const leaderboard = useQuery({
        queryKey: ['sessions', token],
        queryFn: () => getLeaderboard(),
        retry: false,
    })
    return (
                
    )
}