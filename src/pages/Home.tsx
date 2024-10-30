import * as Tabs from '@radix-ui/react-tabs';
import { RegisterAccountForm } from '../components/User/RegisterAccountForm';
import { NewUserLoginForm } from '../components/User/UserLoginForm';
import logoSvg from '../assets/logo.svg'
import { useState, useEffect } from 'react';
export function Home() {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    
      useEffect(() => {
        // Função para atualizar o tamanho da tela
        const handleResize = () => {
          setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
          });
        };
    
        // Adiciona o listener de redimensionamento da janela
        window.addEventListener('resize', handleResize);
    
        // Remove o listener quando o componente desmonta
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []); // O array vazio garante que o efeito seja executado apenas uma vez ao montar
    
    return (
        
        <div className="md:h-screen sm:h-full w-full bg-background">
            <div className="md:grid md:grid-cols-12 h-full w-full" >
                <div className="md:col-span-8 bg-no-repeat bg-cover bg-center bg-backgroundHome md:h-full ">
                    <div className=" flex flex-col w-full h-full pl-8 bg-background bg-opacity-10">
                        <img className="md:mt-16 md:ml-8 sm:h-[100px] sm:w-[200px]  " src={logoSvg} alt="" width={windowSize.width <= 640 ? 200: 400}/>
                        <p className='md:mt-4 md:ml-8 md:text-3xl  text-zinc-200 font-semibold'>One step Every day...</p>
                    </div>
                </div>
                <div className="h-full md:col-span-4 bg-zinc-900 flex items-center  right-0">
                    <Tabs.Root
                        className=" flex flex-col rounded-md h-full w-full static"
                        defaultValue='signUp'
                    >
                        <Tabs.List
                            className="flex justify-around h-[60px]"
                        >
                            <Tabs.Trigger 
                                
                                value="signUp"
                                className="font-semibold border-b border-zinc-500 data-[state=active]:border-b-2 data-[state=active]:border-violet-500 data-[state=active]:text-violet-500 w-1/2 p-4 hover:text-violet-500 transition-all"
                            >
                               Cadastre-se
                            </Tabs.Trigger>
                            <Tabs.Trigger
                                value="login"
                                className="font-semibold border-b border-zinc-500 data-[state=active]:border-b-2 data-[state=active]:border-violet-500 data-[state=active]:text-violet-500 w-1/2 p-4 hover:text-violet-500 transition-all"
                            >
                                Login
                            </Tabs.Trigger>
                        </Tabs.List>
                        <div className='md:my-auto'>
                            <Tabs.Content 
                                className='p-2 flex items-center w-full'
                                value="signUp"
                            >
                            <RegisterAccountForm />
                            </Tabs.Content>
                            <Tabs.Content
                                className='w-full p-2 flex items-center '
                                value="login"
                            >
                                <NewUserLoginForm/>
                            </Tabs.Content>
                        </div>
                    </Tabs.Root>
                </div>
            </div>
        </div>
    )
}