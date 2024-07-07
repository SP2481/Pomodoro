import { useLogin } from '@/hooks/useLogin';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { ProfileDropdown } from './profile-dropdown';

export default function Header(){
    const accesstoken = Cookies.get('accesstoken')
    const { notLoggedInHandler } = useLogin()
    const { push } = useRouter()
    return (
        <div>
            <nav className="w-full h-20 shadow-xl flex justify-around items-center">
                <h1 className="text-white" onClick={() => push('/')}>Pomodoro</h1>
                <div className="flex items-center">
                    {
                        accesstoken ? (
                            <ProfileDropdown/>
                        ) : (
                            <button className='w-24 h-8 bg-white rounded-md text-black' onClick={notLoggedInHandler}>Login</button>
                        )
                    }
                </div> 
            </nav>
        </div>
    )
}