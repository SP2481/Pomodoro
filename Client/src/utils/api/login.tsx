import requestor from '@/helper/requestor';

interface Props {
    email : string,
    password: string
}

interface SignUpData {
    firstName:string,
    lastName:string,
    email:string,
    password:string
}

export const LoginUser = async (loginData:Props) => {
    try{
        const response = await requestor.post('/user/login', loginData);
        return response;
    } catch(err:any) {
        return err?.response?.data.message;
    }
}

export const SignupUser = async (signupData:SignUpData) => {
    try{
        const response = await requestor.post('/user/signup', signupData);
        return response;
    } catch(err:any) {
        console.log(err)
        return err?.response?.data.message;
    }
}