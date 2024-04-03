import { LoginWithGoole } from "./LoginWithGoogle";

export function RegisterAccountForm(){
    return (
        <div>
            <p className='px-6 pt-2 text-zinc-500'>Crie sua conta agora mesmo para ter acesso ao painel !!</p>
            <form className='w-full flex flex-col h-full rounded-md px-6 '>
                <label
                    className='pt-2 px-2 pb-1 text-zinc-300'
                    htmlFor="">Nome</label>
                <input 
                    className='text-zinc-300 h-11 rounded-md px-2 bg-zinc-800 border-zinc-700 border-[1px]  focus:outline-none focus:ring-2 focus:ring-offset-zinc-900 focus:ring-zinc-800 '
                    type="text" 
                    placeholder='Jonh Doe'    
                />
                    
                <label
                    className='pt-2 px-2 pb-1 text-zinc-300'
                    htmlFor="">Email</label>
                <input 
                    className=' text-zinc-300 h-11 rounded-md px-2 bg-zinc-800 border-zinc-700 border-[1px]' 
                    type="text" 
                    placeholder='JonhDoe@gmail.com'    
                />
                <label 
                    className='pt-2 px-2 pb-1 text-zinc-300'
                    htmlFor="">Senha</label>
                <input  
                    type="password"
                    className='text-zinc-300 h-11 rounded-md px-2 bg-zinc-800 border-zinc-700 border-[1px]' 
                    placeholder="*********"
                    />
                <label
                    className='pt-2 px-2 pb-1 text-zinc-300'
                    htmlFor="">Confirmar senha</label>
                <input 
                    type="password"
                    className='text-zinc-300 h-11 rounded-md px-2 bg-zinc-800 border-zinc-700 border-[1px]' 
                    placeholder="*********"
                    />
                    <span className='h-4'></span>
                <button
                    className='bg-gradient-to-r from-violet-400 via-violet-600 to-violet-400 via-violet-600 animate-shimmer hover:scale-105 transition duration-500 ease-out bg-green-500 rounded-md p-3  font-semibold'
                >Crie sua conta</button>
            </form>
            <div className="w-full px-6 py-4  flex flex-col items-center" >
                <span className="text-zinc-300 mb-2 font-semibold">OU</span>
                <LoginWithGoole/>
            </div>
        </div>
    )
}