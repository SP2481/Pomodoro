import { useLogin } from '@/hooks/useLogin';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ProfileDropdown } from './profile-dropdown';




export default function Header(){
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const { notLoggedInHandler } = useLogin()
    const { push } = useRouter();

    useEffect(() => {
        setAccessToken(Cookies.get('accesstoken') ?? null);
    }, [accessToken]);

    return (
        <div>
            <nav className="w-full h-20 shadow-xl flex justify-around items-center">
                <h1 className="text-white" onClick={() => push('/')}>Pomodoro</h1>
                <div className="flex items-center gap-4">
                    {
                        accessToken ? (
                            <ProfileDropdown/>
                        ) : (
                            <>
                            
                            <button className='w-24 h-8 bg-white rounded-md text-black' onClick={notLoggedInHandler}>Login</button>
                            </>
                        )
                    }
                </div> 
            </nav>
        </div>
    )
}