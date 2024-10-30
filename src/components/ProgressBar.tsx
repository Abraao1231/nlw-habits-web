import clsx from "clsx"

interface ProgressBarProps {
    progress: number
    disable: boolean
}
export function Progressbar(props: ProgressBarProps){
    
    return (
        <div className={clsx('h-3 rounded-xl bg-zinc-700 w-1/2 my-2', {
            'w-full': props.disable,
        })}>
                        
        <div
            aria-label='Progresso de hábitos completados nesse dia'
            aria-valuenow={props.progress}
            role='progressbar'
            className='h-3 rounded-xl bg-violet-600 transition-all ease-linear' 
            style={{width: `${props.progress}%`}}
            ></div>
    </div>
    )
}