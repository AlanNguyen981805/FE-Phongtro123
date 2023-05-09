import axiosConfig from "../axiosConfig"
import { IFormAuth } from "../types/auth"

export const apiRegister = (payload: IFormAuth) => new Promise(async(resolve, reject) => {
    try {
        const response = axiosConfig({
            method: "Post",
            url: '/api/v1/auth/register',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiLogin = (payload: Pick<IFormAuth, 'password' | 'phone'>) => new Promise(async(resolve, reject) => {
    try {
        const response = axiosConfig({
            method: "Post",
            url: '/api/v1/auth/login',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})