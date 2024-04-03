import * as Checkbox  from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";
import { FormEvent, useState } from "react";
import { api } from "../lib/axios";
import { useCookies } from 'react-cookie'

const avaliableWeekDays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', "Sábado"]

export  function NewHabitForm(){
    const [title, setTitle] = useState("")
    const [weekDays, setWeekDays] = useState<number[]>([])

    const [cookiesToken] = useCookies(['token']);
    const Token = cookiesToken['token'];

    async function createNewHabit(event: FormEvent){
        event.preventDefault();
        if (!title || weekDays.length === 0){
            return;
        }
        api.post('habits', {
            "title":title,
            "WeekDays": weekDays,
        }, { headers:{Authorization: `Bearer ${Token}`} })
        
        setTitle("")
        setWeekDays([])
        alert('hábito criado com sucesso')
    }

    function handleToggleWeekday(weekDay: number){
        let newWeekDays: number[]
        if (weekDays.includes(weekDay))
            newWeekDays = weekDays.filter(day => day != weekDay)
        else 
            newWeekDays = [...weekDays, weekDay]
        
            setWeekDays(newWeekDays)
        
    }
    return (
        <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6 ">
            <label htmlFor="title" className="font-semibold leading-tigth">
                Qual seu comprometimento
            </label>

            <input 
                className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-offset-zinc-900 focus:ring-violet-600 focus:ring-offset-2 "
                type="text" 
                name="" 
                id="title" 
                placeholder="Ex.: Exercícios, dormir bem, etc..."
                autoFocus
                value={title}
                onChange={event => setTitle(event.target.value)}
            />

            <label htmlFor="" className="font-semibold leading-tigth mt-4">
                Qual a recorrência
            </label>

            <div className="flex flex-col gap-2 mt-3 ">
                {avaliableWeekDays.map((weekDay, index)=> (
                    <Checkbox.Root 
                        key={weekDay}
                        className='flex items-center gap-3 group focus:outline-none'
                        onCheckedChange={() => handleToggleWeekday(index)}
                        checked={weekDays.includes(index)}
                        >
                        <div  
                        className='group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors
                                        h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 
                                        group-focus:ring-2 group-focus:ring-offset-zinc-900 group-focus:ring-violet-600 group-focus:ring-offset-2
                                        '>
                            <Checkbox.Indicator>
                                <Check className='text-white' size={20}/>
                            </Checkbox.Indicator>
                        </div>
                    
                    <span className='text-white leading-tight '>
                        {weekDay}
                    </span>
                </Checkbox.Root>
                ))}
                
            </div>

            <button
                className="
                focus:outline-none focus:ring-2 focus:ring-offset-zinc-900 focus:ring-green-600 focus:ring-offset-2
                transition-colors mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500 ">
                <Check size={20} weight="bold"/>
                Confirmar
            </button>

        </form>
    )
}