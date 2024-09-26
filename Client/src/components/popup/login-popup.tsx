import { usePopup } from '@/hooks/usePopup';
import { LoginUser, SignupUser } from '@/utils/api/login';
import { ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FlexBoxColumnCentered } from '../flex-box/flex-box';
import CircularIndeterminate from '../progress-bar/circular-progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

export default function LoginPopup() {
    const { register: signUpRegister, handleSubmit: handleSignupSubmit, formState: { errors: signupErrors } } = useForm();
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
                console.log("s;lajd")
                closePopup();
            }

    };
    const handleSignUp = async (data:any) => {
        console.log(data);
         setLoading(true);
        const response = await SignupUser(data)
            if (response === 'Email alredy exists') {
                setError(true);
                setLoading(false);
            } else {
                console.log("s;lajd")
                closePopup();
            }

    }

    return (
        <section className="min-h-[25rem] w-[20rem] bg-black shadow-lg shadow-[#777777] rounded-lg flex items-center justify-center">
            <div className='flex flex-col items-center p-4 text-white h-[100%]'>
                <h1 className="mb-4 text-xl font-bold">Sign in to get started</h1>
                <Tabs defaultValue="login" className="flex flex-col self-center items-center gap-4" >
                    <TabsList className='bg-[#777777]'>
                        <TabsTrigger value="login">Login</TabsTrigger>
                        <TabsTrigger value="signup">SignUp</TabsTrigger>
                    </TabsList>
                    <TabsContent value="login">                        
                        <form onSubmit={handleLoginSubmit(handleLogin)} className='flex flex-col justify-around gap-4'>
                            <FlexBoxColumnCentered style={{ alignItems: 'flex-start', gap: '0.4rem' }}>

                                <label htmlFor="login-email">Email</label>
                                <input type="email" id="login-email" {...loginRegister('email', { required: 'Email is required', pattern: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/ })} className='w-max h-8 rounded-sm bg-black border-[0.5px] p-2  border-white ' />
                                {loginErrors.email && <span className="text-red-500 text-sm">{loginErrors.email.message as ReactNode}</span>}
                            </FlexBoxColumnCentered>
                            <FlexBoxColumnCentered style={{ alignItems: 'flex-start',gap: '0.4rem'  }}>

                                <label htmlFor="login-password">Password</label>
                                <input type="password" id="login-password" {...loginRegister('password', { required: 'Password is required' })} className='w-max h-8 rounded-sm bg-black border-[0.5px] p-2  border-white ' />
                                {loginErrors.password && <span className="text-red-500 text-sm">{loginErrors.password.message as ReactNode}</span>}
                            </FlexBoxColumnCentered>
                            {error && <small style={{color:'red'}}>Invalid email/password</small>}
                            <button type="submit" className='w-full h-8 bg-yellow-300 text-black rounded-sm mt-2 hover:scale-105 duration-100 flex justify-center'>{loading ? (
                                <CircularIndeterminate/>
                            ) : 'Login'}</button>
                        </form>
                    </TabsContent>
                    <TabsContent value="signup">
                        <form onSubmit={handleSignupSubmit(handleSignUp)} className='flex flex-col gap-2'>
                            <FlexBoxColumnCentered style={{ alignItems: 'flex-start', gap: '0.2rem' }}>

                                <label htmlFor="firstName">First Name</label>
                                <input type="text" id="firstName" {...signUpRegister('firstName', { required: 'first name is required' })} className='w-max h-8 rounded-sm bg-black border-[0.5px] p-2  border-white ' />
                                {signupErrors.firstName && <span className="text-red-500 text-sm">{signupErrors?.firstName?.message as ReactNode}</span>}
                            </FlexBoxColumnCentered>
                            <FlexBoxColumnCentered style={{ alignItems: 'flex-start', gap: '0.2rem' }}>

                                <label htmlFor="lastName">last name</label>
                                <input type="text" id="last-name" {...signUpRegister('lastName', { required: 'last name is required'})} className='w-max h-8 rounded-sm bg-black border-[0.5px] p-2  border-white ' />
                                {signupErrors.lastName && <span className="text-red-500 text-sm">{signupErrors?.lastName?.message as ReactNode}</span>}
                            </FlexBoxColumnCentered>
                            <FlexBoxColumnCentered style={{ alignItems: 'flex-start', gap: '0.2rem' }}>

                                <label htmlFor="login-email">Email</label>
                                <input type="email" id="login-email" {...signUpRegister('email', { required: 'Email is required', pattern: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/ })} className='w-max h-8 rounded-sm bg-black border-[0.5px] p-2  border-white ' />
                                {signupErrors.email && <span className="text-red-500 text-sm">{signupErrors.email.message as ReactNode}</span>}
                            </FlexBoxColumnCentered>
                            <FlexBoxColumnCentered style={{ alignItems: 'flex-start' }}>

                                <label htmlFor="login-password">Password</label>
                                <input type="password" id="login-password" {...signUpRegister('password', { required: 'Password is required' })} className='w-max h-8 rounded-sm bg-black border-[0.5px] p-2  border-white ' />
                                {signupErrors.password && <span className="text-red-500 text-sm">{signupErrors.password.message as ReactNode}</span>}
                            </FlexBoxColumnCentered>
                            {error && <small style={{color:'red'}}>Email already exists</small>}
                            <button type="submit" className='w-full h-8 bg-yellow-300 text-black rounded-sm mt-2 hover:scale-105 duration-100 flex justify-center'>{loading ? (
                                <CircularIndeterminate/>
                            ) : 'Signup'}</button>
                        </form>
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    );
}
