import jwt from 'jsonwebtoken'

interface JWTPayload {
    email: string;
    role: string;
}

export function genrateJWT<T>(payload:JWTPayload){
    const token = jwt.sign(payload,process.env.JWT_SECRET as string, {
        expiresIn: 60 * 60 * 24 * 30
    })
    return token
}

export function verifyJWT<T>(token:string){
    try{
        const userData = jwt.verify(token, process.env.JWT_SECRET as string)
        return {
            success:true,
            data: userData
        }
    }catch(err:any){
        return {
            success:false,
            data: err.message
        }
    }
} 