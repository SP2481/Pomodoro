import requestor from '@/helper/requestor';

export const getLeaderboard = async () => {
    const response = await requestor.get('/leaderboard');
    return response.data;
}