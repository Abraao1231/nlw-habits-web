import { useState, useEffect } from "react";
import { LoginWithGoole } from "./LoginWithGoogle";
import clsx from "clsx";
import { userRegisterSchema } from "../../schemas/RegisterUserSchema";
import colors from 'tailwindcss/colors';
import { api } from "../../lib/axios";
import { useCookies } from "react-cookie";
import { WarningCircle } from "phosphor-react";
import { useNavigate } from "react-router-dom";


export function RegisterAccountForm(){
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isEqualPassword, setIsEqualPassword] = useState(false);
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false); // Estado para controlar submissão
    const navigate = useNavigate();
    const [cookiesUser, setUser] = useCookies(['user']);
    const [token, setToken] = useCookies(['token']);

    useEffect(() => {
        setIsEqualPassword(password === confirmPassword && password.length > 0);
    }, [password, confirmPassword]);

    async function handleSubmitRegisterUser(event: any){
        event.preventDefault(); // Impede a atualização da página
        
        try {
            const data = userRegisterSchema.parse({
                username: userName,
                password: password,
                email: email,
                confirm_password: confirmPassword
            });
            await submitCreateUser(data)
        } catch (error) {            
            setError(JSON.parse(error.message)[0].message);
        }   
    }
    async function submitCreateUser(data: object){
        
        api.post('user', {
            "name": data.username,
            "email": data.email,
            "password": data.password
        }).then(response => {
            setUser('user', response.data.user);
            setToken('token', response.data.token);
            navigate('/dashboard')
        })
        .catch(responseError => {
            console.log(responseError.response.status);
            
            if(responseError.response.status == 400)
                setError(responseError.response.data.message)
            else
                setError("Erro interno do servidor")
        })
    }
    return (
        <div className="w-full ">
            <p className='px-6 pt-2 text-zinc-500'>Crie sua conta agora mesmo para ter acesso ao painel !!</p>
            <form className='w-full flex flex-col rounded-md px-6'>
                <label className='pt-2 px-2 pb-1 text-zinc-300' htmlFor="">Nome</label>
                <input 
                    className='text-zinc-300 h-11 rounded-md px-2 bg-zinc-800 border-zinc-700 border-[1px] focus:outline-none focus:ring-2 focus:ring-offset-zinc-900 focus:ring-zinc-800'
                    type="text" 
                    placeholder='Jonh Doe' 
                    onChange={event => setUserName(event?.target.value)}   
                />
                    
                <label className='pt-2 px-2 pb-1 text-zinc-300' htmlFor="">Email</label>
                <input 
                    className='text-zinc-300 h-11 rounded-md px-2 bg-zinc-800 border-zinc-700 border-[1px]' 
                    type="text" 
                    placeholder='JonhDoe@gmail.com'    
                    onChange={event => setEmail(event?.target.value)}   
                />

                <label className='pt-2 px-2 pb-1 text-zinc-300' htmlFor="">Senha</label>
                <input  
                    type="password"
                    className='text-zinc-300 h-11 rounded-md px-2 bg-zinc-800 border-zinc-700 border-[1px]' 
                    placeholder="*********"
                    onChange={event => setPassword(event?.target.value)}   
                />

                <label className='pt-2 px-2 pb-1 text-zinc-300' htmlFor="">Confirmar senha</label>
                <input 
                    type="password"
                    className='text-zinc-300 h-11 rounded-md px-2 bg-zinc-800 border-zinc-700 border-[1px]' 
                    placeholder="*********"
                    onChange={event => setConfirmPassword(event?.target.value)}   
                />

                <span className='h-4'></span>
                
                <button
                    onClick={event => handleSubmitRegisterUser(event)}
                    disabled={!isEqualPassword}
                    className={clsx('rounded-md p-3 font-semibold transition-colors duration-500 ease-out', {
                        'bg-gradient-to-r from-violet-400 via-violet-600 to-violet-400 via-violet-600 animate-shimmer hover:scale-105': isEqualPassword,
                        'bg-gradient-to-r from-gray-400 via-gray-600 to-gray-400 via-gray-600 cursor-not-allowed': !isEqualPassword
                    })}
                >
                    Crie sua conta
                </button>
            </form>
            {
                error.length > 0 &&
                <span className={clsx("w-full px-6 py-4 text-sm none text-red-500 font-semibold", {'flex ': error.length > 0})}>
                    <WarningCircle className="mr-2" size={20} color={colors.red[500]} weight="bold"/>
                    {error}    
                    </span>
            }
            {/* <div className="w-full px-6 py-4 flex flex-col items-center">
                <span className="text-zinc-300 mb-2 font-semibold">OU</span>
                <LoginWithGoole />
            </div> */}
        </div>
    );
}
