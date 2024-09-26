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
    const { openPopup } = usePopup();
    const [accessToken, setAccessToken] = useState<string | null>(Cookies.get('accesstoken') ?? null);
    const { login } = useAuth(); // use the context
    useQuery({
       queryKey:['verifyuser', accessToken],
       queryFn: () => {
            verifyUser()
       },
       onSuccess: () => {
        login();
       },
       onError: () => {
        Cookies.remove('accesstoken');
                setAccessToken(null);
       },
       enabled: !!accessToken,
       retry:false,
       refetchOnMount: true,
       refetchOnWindowFocus: false
    })


    const notLoggedInHandler = () => {
        if (!accessToken) {
            openPopup(<LoginPopup />);
        }
    };

    const logoutHandler = () => {
        if (accessToken) {
            Cookies.remove('accesstoken');
            setAccessToken(null);
            notLoggedInHandler();
        }
    };

    return {
        notLoggedInHandler,
        logoutHandler,
    };
};
