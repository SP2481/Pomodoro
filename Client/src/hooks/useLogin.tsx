import LoginPopup from '@/components/popup/login-popup';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { usePopup } from './usePopup';

export const useLogin = () => {
    const { openPopup } = usePopup()
    const accesstoken = Cookies.get('accesstoken');


    useEffect(() => {
        if (!accesstoken) {
            openPopup(<LoginPopup />)
        }
    }, [accesstoken]);

    const notLoggedInHandler = () => {
            if (!accesstoken) {
                openPopup(<LoginPopup />)
            }
    }

    const logoutHandler = () => {
        if(accesstoken) {
            Cookies.remove('accesstoken');
            notLoggedInHandler()
        }
    }


    return {
        notLoggedInHandler,
        logoutHandler
    }

}