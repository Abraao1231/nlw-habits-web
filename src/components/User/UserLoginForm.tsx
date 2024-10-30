import { FormEvent, useState } from "react"
import { validateEmail } from "../../utils/validateEmail";
import { api } from "../../lib/axios";
import { useNavigate } from "react-router-dom";
import { LoginWithGoole } from "./LoginWithGoogle";
import { useCookies } from "react-cookie";


export function NewUserLoginForm() {
    const navigate = useNavigate();

    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    const [cookiesUser, setUser] = useCookies(['user']);
    const [token, setToken] = useCookies(['token']);

    async function loginUser(event: FormEvent) {
        event.preventDefault();

        if (password == "" || email == "" || !validateEmail(email)) {
            alert("Ops ! algum campo está vazio ou incorreto")
            return;
        }

        api.post('auth/login', {
            email: email,
            password: password
        }).then(response => {

            setUser('user', response.data.user);
            setToken('token', response.data.token);
            
            return navigate("/dashboard")
        }).catch(response => {
            if (!response.response)
                alert('erro no servidor')
            else 
                alert(response.response.data.message);
                
        })
    }


    return (
        <div className="w-full">
            <p className="p-6  text-zinc-500">Entre em sua conta para ter acesso aos seus dados !</p>
            <form onSubmit={loginUser} className="w-full flex flex-col px-6 justify-center ">
                <label htmlFor="title" className="font-semibold leading-tigth">
                    E-mail
                </label>

                <input
                    className="p-4 rounded-lg mt-1 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-offset-zinc-900 focus:ring-violet-600 focus:ring-offset-2 "
                    type="text"
                    name=""
                    placeholder="Ex:. anaMaria@gmail.com"
                    autoFocus
                    onChange={event => setEmail(event.target.value)}
                />

                <label htmlFor="" className="font-semibold leading-tigth mt-4">
                    Senha
                </label>
                <input
                    className="p-4 rounded-lg mt-1 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-offset-zinc-900 focus:ring-violet-600 focus:ring-offset-2 "
                    type="password"
                    name=""
                    placeholder="Digite sua senha"
                    autoFocus
                    onChange={event => setPassword(event.target.value)}
                />
                <button
                    className='mt-4 bg-gradient-to-r from-violet-400 via-violet-600 to-violet-400 via-violet-600 animate-shimmer hover:scale-105 transition duration-500 ease-out bg-green-500 rounded-md p-3  font-semibold'
                >Login</button>
            </form>
            <div className="w-full px-6 py-4  flex flex-col items-center" >
                <span className="text-zinc-300 mb-2 font-semibold">OU</span>
                <LoginWithGoole />
            </div>
        </div>
    )
}
