import requestor from '@/helper/requestor';

interface Props {
    email : string,
    password: string
}

export const LoginUser = async (loginData:Props) => {
        const response = await requestor.post('/user/login', loginData)
        return response;

}