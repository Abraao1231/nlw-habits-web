import { useCookies } from 'react-cookie';

export function setAuthCookies(token: string, user: object){
    const [cookies, setCookie] = useCookies();
    setCookie('user', user)
    setCookie('token', token)


}