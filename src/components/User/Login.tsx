import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'phosphor-react'
import { NewUserLoginForm } from './UserLoginForm';
import { userProps } from './UserSideBar';
import { ButtonUser } from './ButtonUser';


export function Login(user: userProps){
    return (
        <Dialog.Root>
          <Dialog.Trigger 
            type="button"
            
          >
          <ButtonUser name={user.name} />
          </Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Overlay className='w-screnn h-screen bg-black/80 fixed inset-0'/>
            <Dialog.Content className='text-white absolute px-10 py-4 bg-zinc-900 rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
              <Dialog.Close>
                <X 
                  className='absolute right-6 top-6 text-zinc-400 hover:text-violet-500 transition-all'
                  size={24}
                  aria-label='Fechar'
              />
            </Dialog.Close>
            <Dialog.Title className='text-3xl leading-tigth font-extrabold'>Login</Dialog.Title>
            <NewUserLoginForm/>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    )
}