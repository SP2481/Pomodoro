import LoginPopup from '@/components/popup/login-popup';
import requestor from '@/helper/requestor';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                await verifyUser();
                login()
                return;
            } catch (error) {
                Cookies.remove('accesstoken');
                setAccessToken(null);
            }
        };

        if (accessToken) {
            fetchData();
        }
    }, [accessToken, login]); // add isLoggedIn to dependencies

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
