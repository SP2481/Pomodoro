import argon2 from 'argon2'

export const hashPassword = async (password:string):Promise<string> => {
    try {
        const hashedPassword = await argon2.hash(password)
        return hashedPassword
    } catch (error) {
        throw new Error('Cannot hash password')
    }
}