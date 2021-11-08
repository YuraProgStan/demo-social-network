import {instance, APIResponseType, ResultCodeForCaptchaEnum, ResultCodesEnum} from "./api";

type MeResponseDataType = {
    id: number
    email: string
    login: string
}
// type MeResponseType = {
//     data: { id: number, email: string, login: string }  //если в строчку, то нужны запятые
//     resultCode: ResultCodesEnum
//     messages: Array<string>
//
// }
type LoginResponseDataType = {
           userId: number
}
// type LoginResponseType = {
//     data: {
//         userId: number
//     }
//     resultCode: ResultCodesEnum | ResultCodeForCaptcha
//     messages: Array<string>
//
// }
export const authAPI = {
    // me() {
    //     return instance.get<MeResponseType>(`auth/me`).then(res => res.data)
    // },
    me() {
        return instance.get<APIResponseType<MeResponseDataType>>(`auth/me`).then(res => res.data)

    },

    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<APIResponseType<LoginResponseDataType, ResultCodesEnum | ResultCodeForCaptchaEnum>>(`auth/login`, {email, password, rememberMe, captcha})
            .then(res => res.data)
    },
    logout() {
        return instance.delete(`auth/login`)
    }
}