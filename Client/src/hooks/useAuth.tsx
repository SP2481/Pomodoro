import { LoginContext } from '@/contexts/login-context';
import { useContext } from 'react';

export const useAuth = () => {
    const context =   useContext(LoginContext)
    if (!context) {
        throw new Error("usePopup must be used within a PopupProvider");
    }
    return context;
}