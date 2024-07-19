import { useAuth } from '@/hooks/useAuth';
import { useLogin } from '@/hooks/useLogin';
import Link from 'next/link';
import { ProfileDropdown } from './profile-dropdown';




export default function Header(){
    const { notLoggedInHandler } = useLogin()
    const { isLoggedIn } = useAuth()

    return (
        <div>
            <nav className="w-full h-20 shadow-xl flex justify-around items-center">
                <Link href={'/'}>
                <h1 className="text-white">Pomodoro</h1>
                </Link>
                <div className="flex items-center gap-4">
                    {
                        isLoggedIn ? (
                            <ProfileDropdown/>
                        ) : (
                            <>
                            
                            <button className='w-24 h-8 bg-yellow-300 rounded-2xl font-medium text-black' onClick={notLoggedInHandler}>Login</button>
                            </>
                        )
                    }
                </div> 
            </nav>
        </div>
    )
}