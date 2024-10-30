import { User } from 'phosphor-react'

interface ButtonUserProps {
    name: string
}

export function ButtonUser(props : ButtonUserProps){
    return (
        <div className='flex items-center'>
            <User 
                size={30}
                className='text-violet-500'
            ></User>
            <span className='pl-2 font-semibold text-md hover:text-violet-500 transition-all'>
                {props.name}
            </span>
        </div>
  
    )
}