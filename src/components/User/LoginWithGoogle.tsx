import { FcGoogle } from "react-icons/fc";

export function LoginWithGoole(){
    return (
        <button
            className=' text-zinc-300 flex items-center justify-center w-full rounded-md p-2 font-semibold border-2 border-zinc-800 hover:border-zinc-600 transition-all'
        >
        <FcGoogle
        className="pr-2 text-3xl"
        />
        Entrar com Google
        </button>
    )
}