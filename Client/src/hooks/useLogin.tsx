import LoginPopup from '@/components/popup/login-popup';
import requestor from '@/helper/requestor';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useAuth } from './useAuth';
import { usePopup } from './usePopup';

const verifyUser = async () => {
    const data = await requestor.get('/user/verify-user');
    return data;
}

export const useLogin = () => {
    const { openPopup } = usePopup()
    const [accessToken, setAccessToken] = useState<string  | null>(Cookies.get('accesstoken') ?? null);
    const { dispatch } = useAuth(); 

    useQuery({
        queryKey: ['user', accessToken],
        queryFn: () => verifyUser(),
        onSuccess: (data) => {
            dispatch({
                type:'SET_EMAIL',
                payload: data?.data?.data?.email 
            })
        },
        onError: () => {
            Cookies.remove('accesstoken');
            setAccessToken(null);
        },
        retry:false
    })


    const notLoggedInHandler = () => {
            if (!accessToken) {
                openPopup(<LoginPopup />)
            }
    }

    const logoutHandler = () => {
        if(accessToken) {
            Cookies.remove('accesstoken');
            setAccessToken(null);
            notLoggedInHandler()
        }
    }


    return {
        notLoggedInHandler,
        logoutHandler
    }

}