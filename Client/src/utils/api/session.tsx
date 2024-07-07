import requestor from '@/helper/requestor';


export const createSession = async (data: { end_time : number}) => {
    const response = await requestor.post('/session', data)
    console.log(response);
    return response;
}

export const getAllSessions = async () => {
    const response =  await requestor.get('/session')
    return response.data
}