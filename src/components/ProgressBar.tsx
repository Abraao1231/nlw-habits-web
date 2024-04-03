interface ProgressBarProps {
    progress: number
}
export function Progressbar(props: ProgressBarProps){
    
    return (
        <div className='h-3 rounded-xl bg-zinc-700 w-full mt-4'>
                        
        <div
            aria-label='Progresso de hábitos completados nesse dia'
            aria-valuenow={props.progress}
            role='progressbar'
            className='h-3 rounded-xl bg-violet-600 transition-all'
            style={{width: `${props.progress}%`}}
            ></div>
    </div>
    )
}