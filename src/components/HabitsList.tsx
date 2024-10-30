import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import dayjs from "dayjs";
import { useCookies } from "react-cookie";
import { useContext } from "react";
import { SummaryContext } from "../context/summaryContext";
import { Progressbar } from "./ProgressBar";

interface HabitsListProps {
    date: Date,
    onCompletedChange: (completed: number) => void,
    disable: boolean
}
interface HabitsInfo {
    possibleHabits: {
        id: string;
        title: string;
        created_at: string
    }[];
    completedHabits: string[]
}
export function HabitsList({ date, onCompletedChange, disable }: HabitsListProps) {
    const [habitsInfo, sethabitsInfo] = useState<HabitsInfo>()

    const context = useContext(SummaryContext);

    if (!context) {
        throw new Error('SummaryTable must be used within a SummaryContext.Provider');
    }
    const { setSummary,summary } = context;
    const isDateisPast = dayjs(date).endOf('day').isBefore(new Date())

    const [cookiesToken] = useCookies(['token']);
    const Token = cookiesToken['token'];
    let  percentage = 0;
    useEffect(() => {
        sethabitsInfo(habitsInfo); // Atualiza 'completed' quando 'defaultCompleted' mudar
    }, [habitsInfo]);

    useEffect(() => {

        api.get('day', {
            params: {
                date: date,
            },
            headers: { Authorization: `Bearer ${Token}` }
        },).then((response) => {

            sethabitsInfo(response.data)
        })
    }, [summary])

    async function handleToggleHabit(habitId: string) {

        const isAlreadyCompleted = habitsInfo?.completedHabits.includes(habitId)

        let completedHabits: string[]
        await api.patch(`habits/${habitId}/toggle`, {}, { headers: { Authorization: `Bearer ${Token}` } }).then(response => {
            const fetchData = async () => {
                const response = await api.get('summary', { headers: { Authorization: `Bearer ${Token}` } });
                setSummary(response.data);
            };
            fetchData();

        })

        // if (isAlreadyCompleted) {
        //     completedHabits = habitsInfo!.completedHabits.filter(id => id !== habitId)

        // } else {
        //     completedHabits = [...habitsInfo!.completedHabits, habitId]
        // }
        // sethabitsInfo({
        //     possibleHabits: habitsInfo!.possibleHabits,
        //     completedHabits
        // })
        // onCompletedChange(completedHabits.length)
    }

    if (habitsInfo)
        percentage = habitsInfo.completedHabits.length / habitsInfo.possibleHabits.length * 100
        percentage = percentage % 10 == 0 ? percentage: Number(percentage.toFixed(2)) 
    return (


        <div className='mt-6 felx flex-col gap-3'>
            <h1 className="font-semibold text-xl">{percentage} %</h1>
            <Progressbar progress={percentage} disable={disable}/>

            {
                habitsInfo?.possibleHabits ? habitsInfo.possibleHabits.map(habit => {
                    return (
                        <div key={habit.id}>
                            <Checkbox.Root
                                checked={habitsInfo.completedHabits.includes(habit.id)}
                                disabled={disable}
                                className='flex items-center gap-3 group p-1 focus:outline-none disabled:cursor-not-allowed'
                                onCheckedChange={() => handleToggleHabit(habit.id)}
                            >

                                <div className='group-data-[state=checked]:bg-green-500 
                                    group-data-[state=checked]:border-green-500 
                                    h-8 w-8 rounded-lg flex items-center justify-center 
                                    bg-zinc-900 border-2 border-zinc-800 
                                    group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background
                                    '>
                                    <Checkbox.Indicator>
                                        <Check className='text-white' size={20} />
                                    </Checkbox.Indicator>
                                </div>

                                <span className='font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400'>
                                    {habit.title}
                                </span>
                            </Checkbox.Root>
                        </div>
                    )
                }) : <>sem habitos pra hj</>}

        </div>

    )
}