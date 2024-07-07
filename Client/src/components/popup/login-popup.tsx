import { usePopup } from '@/hooks/usePopup';
import { LoginUser } from '@/utils/api/login';
import { ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FlexBoxColumnCentered } from '../flex-box/flex-box';
import CircularIndeterminate from '../progress-bar/circular-progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

export default function LoginPopup() {
    const { register: loginRegister, handleSubmit: handleLoginSubmit, formState: { errors: loginErrors } } = useForm();
    const { closePopup } = usePopup();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (data: any) => {
        // Handle login form submission logic here
        setLoading(true);
        const response = await LoginUser(data)
        if (response === 'Invalid password') {
            setError(true);
            setLoading(false);
        } else {
            closePopup();
        }
    };

    return (
        <section className="h-[25rem] w-[20rem] bg-black border-2 border-white">
            <div className='flex flex-col h-full justify-center items-center p-4 text-white'>
                <h1 className="mb-4 text-xl font-bold">Sign in to get started</h1>
                <Tabs defaultValue="login" className="flex flex-col self-center items-center gap-5" >
                    <TabsList>
                        <TabsTrigger value="login">Login</TabsTrigger>
                    </TabsList>
                    <TabsContent value="login">
                        <form onSubmit={handleLoginSubmit(handleLogin)} className='flex flex-col gap-2'>
                            <FlexBoxColumnCentered style={{ alignItems: 'flex-start', gap: '0.2rem' }}>

                                <label htmlFor="login-email">Email</label>
                                <input type="email" id="login-email" {...loginRegister('email', { required: 'Email is required', pattern: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/ })} className='w-max h-8 rounded-sm bg-black border-[0.5px] p-2  border-white ' />
                                {loginErrors.email && <span className="text-red-500 text-sm">{loginErrors.email.message as ReactNode}</span>}
                            </FlexBoxColumnCentered>
                            <FlexBoxColumnCentered style={{ alignItems: 'flex-start' }}>

                                <label htmlFor="login-password">Password</label>
                                <input type="password" id="login-password" {...loginRegister('password', { required: 'Password is required' })} className='w-max h-8 rounded-sm bg-black border-[0.5px] p-2  border-white ' />
                                {loginErrors.password && <span className="text-red-500 text-sm">{loginErrors.password.message as ReactNode}</span>}
                            </FlexBoxColumnCentered>
                            {error && <small style={{color:'red'}}>Invalid email/password</small>}
                            <button type="submit" className='w-full h-8 bg-white text-black rounded-sm mt-2 hover:scale-105 duration-100 flex justify-center'>{loading ? (
                                <CircularIndeterminate/>
                            ) : 'Login'}</button>
                        </form>
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    );
}
