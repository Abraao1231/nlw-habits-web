import * as Tabs from '@radix-ui/react-tabs';
import { RegisterAccountForm } from '../components/User/RegisterAccountForm';
import { NewUserLoginForm } from '../components/User/UserLoginForm';
import logoSvg from '../assets/logo.svg'
export function Home() {
    return (
        //  
        <div className="h-screen w-screen bg-background">
            <div className="grid grid-cols-12 h-full w-full">
                <div className="col-span-8  bg-no-repeat bg-cover bg-center bg-backgroundHome">
                    <div className=" flex flex-col w-full h-full pl-8 bg-background bg-opacity-10">
                        <img  className="mt-16 ml-8 h-[200px] w-[400px] " src={logoSvg} alt="" />
                        <p className=' mt-4 ml-8 text-3xl text-zinc-200 font-semibold'>One step Every day...</p>
                    </div>
                </div>
                <div className="h-full col-span-4 bg-zinc-900 flex items-center  right-0">
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
                        <div className='my-auto'>
                            <Tabs.Content 
                                className='p-2 flex items-center w-full'
                                value="signUp"
                            >
                            <RegisterAccountForm/>
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