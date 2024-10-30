import * as Popover from '@radix-ui/react-popover';
import { ButtonUser } from './ButtonUser';
import { X, UserCircleGear, Sliders, SignOut  } from 'phosphor-react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';

export interface userProps {
  name: string
  email: string
}

export function UserSideBar(user : userProps){
    let {pathname} = useLocation();
    const navigate = useNavigate();

    function logout(){

      
      const cookie = new Cookies()
      cookie.remove('user')
      cookie.remove('token')
    
      if (pathname == '/dashboard')
        return navigate('/')
      if (pathname == '/')
        window.location.href = pathname;
    }


    return (
        <Popover.Root>
          <Popover.Trigger >
              <ButtonUser name={user.name}/>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content
              className="rounded-lg w-[260px] bg-zinc-900 text-zinc-600 p-5 h-[300px]"
              sideOffset={5}
            >
              <div className='flex items-center'>
                <div>
                  <div className='text-zinc-300'>{user.name}</div>
                  <div className='text-sm'>{user.email}</div>
                </div>
                <Popover.Close>
                    <X 
                        className='absolute right-6 top-4 text-zinc-400 hover:text-zinc-200'
                        size={16}
                        aria-label='Fechar'
                      />
                </Popover.Close>
              </div>
              <div className='py-4'>
                <ul className='grid gap-2'>
                  <Link  to='/' className='cursor-pointer '>
                    <li className='flex items-center rounded hover:bg-zinc-700 px-2 hover:text-zinc-400 transition-all'>
                    <Sliders 
                          className='text-zinc-500 pr-1'
                          size={24}
                          aria-label='Gerenciar Hábitos'
                        />
                      Gerenciar Hábitos
                    </li>
                  </Link>
                  <Link  to='/' className='cursor-pointer'>
                    <li className='flex items-center rounded hover:bg-zinc-700 px-2 hover:text-zinc-400 transition-all'>
                      <UserCircleGear 
                          className='text-zinc-500 pr-1'
                          size={24}
                          aria-label='Gerenciar Hábitos'
                        />
                        Configurações de usuario
                    </li>
                  </Link>
                </ul>
              </div>
              <div className='absolute bottom-3'>
                <Link to={'/'} onClick={logout} className='flex items-center'><SignOut className='text-red-700 pr-1 ' size={24} aria-label='Gerenciar Hábitos'/><a className='text-red-700 transition-all'>Logout</a></Link>
              </div>
              {/* <Popover.Arrow className="fill-zinc-900" /> */}
            </Popover.Content>
          </Popover.Portal>
      </Popover.Root>
      
  );
};

