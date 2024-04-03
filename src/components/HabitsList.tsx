import  * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import dayjs from "dayjs";
import { useCookies } from "react-cookie";


interface HabitsListProps  {
    date: Date,
    onCompletedChange: (completed:number) => void
}
interface HabitsInfo {
    possibleHabits: {
        id: string;
        title: string;
        created_at: string
    }[];
    completedHabits: string[]

}
export function HabitsList({date, onCompletedChange}: HabitsListProps){
    const [habitsInfo, sethabitsInfo] = useState<HabitsInfo>()
    const isDateisPast = dayjs(date).endOf('day').isBefore(new Date())
    
    const [cookiesToken] = useCookies(['token']);
    const Token = cookiesToken['token'];
   

    useEffect(()=> {
        api.get('day', {
            params: {
                date: date.toISOString(),
            },
            headers:{Authorization: `Bearer ${Token}`}  
        },).then((response)=>{
            sethabitsInfo(response.data)            
        })        
    }, [])

    async function handleToggleHabit(habitId: string){
        const isAlreadyCompleted = habitsInfo?.completedHabits.includes(habitId)
       
        let completedHabits: string[]
        await api.patch(`habits/${habitId}/toggle`, {} ,{ headers:{Authorization: `Bearer ${Token}`} })

        
        
        if (isAlreadyCompleted){
            completedHabits = habitsInfo!.completedHabits.filter(id => id !== habitId)
           
        } else {
            completedHabits = [...habitsInfo!.completedHabits, habitId]
        }
        sethabitsInfo({
            possibleHabits: habitsInfo!.possibleHabits,
            completedHabits
        })
        onCompletedChange(completedHabits.length)
    }
    return (
        
       
        <div className='mt-6 felx flex-col gap-3'>
            {habitsInfo?.possibleHabits.map(habit => {
                return (
                    <Checkbox.Root 
                        checked={habitsInfo.completedHabits.includes(habit.id)}
                        key={habit.id}
                        disabled={isDateisPast}
                        className='flex items-center gap-3 group p-1 focus:outline-none disabled:cursor-not-allowed'
                        onCheckedChange={()=>handleToggleHabit(habit.id)}
                    >
                    
                    <div className='group-data-[state=checked]:bg-green-500 
                                    group-data-[state=checked]:border-green-500 
                                    h-8 w-8 rounded-lg flex items-center justify-center 
                                    bg-zinc-900 border-2 border-zinc-800 
                                    group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background
                                    '>
                        <Checkbox.Indicator>
                            <Check className='text-white' size={20}/>
                        </Checkbox.Indicator>
                    </div>
                
                <span className='font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400'>
                    {habit.title}
                </span>
            </Checkbox.Root>
                )
            })}
            
        </div>
        
    )
}