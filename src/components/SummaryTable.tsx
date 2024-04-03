import { useEffect, useState } from "react"
import { api } from "../lib/axios"
import { generateDatesFromYearBeginnning } from "../utils/generate-range-betwen-dates"
import HabitDay from "./HabitDay"
import dayjs from "dayjs"
import { useCookies } from "react-cookie"


type Summary = {
    id: string,
    date: string,
    amount: number,
    completed: number
}[]

const weekDay = ['D','S','T','Q','Q','S','S']
const summaryDates = generateDatesFromYearBeginnning()  

const minimumSummaryDaysSize = 10 * 7
const amountOfDayToFill = minimumSummaryDaysSize - summaryDates.length


export function SummaryTable(){
    const [cookiesToken] = useCookies(['token']);
    const Token = cookiesToken['token'];
    const [summary, setSummary] = useState<Summary>([])

    
    useEffect(() => {
        const fetchData = async () => {
          const response = await api.get('summary', { headers: { Authorization: `Bearer ${Token}` } });          
          setSummary(response.data);
        };
        fetchData();
      }, []);
    
    return (
        <div className="w-4/6 flex py-7">
            <div className=" grid grid-rows-7 grid-flow-row gap-3 ">
                {
                    weekDay.map((weekDay, index) => {
                        return  <div key={`${weekDay}${index}`} className="text-zinc-400 text-xl h-10 w-10 flex items-center justify-center">
                        {weekDay}
                    </div>
                    })
                }
               
            </div>
            <div className='w-full overflow-auto grid grid-rows-7 grid-flow-col gap-3'>
                {
                    summary.length > 0 &&
                    summaryDates.map(date => {
                        
                        const dayInSummary = summary.find(day => {    
                            return dayjs(date).isSame(day.date, 'day')
                        })
                     
                        
                        return (
                            <HabitDay  
                                key={date.toString()}
                                date={date} 
                                amount={dayInSummary?.amount} 
                                defaultCompleted={dayInSummary?.completed}/>
                        )
                    })
                }
                {
                    amountOfDayToFill > 0 && Array.from({length: amountOfDayToFill}).map((_, index)=> {
                        return (
                            <div key={index} className='group hover:scale-110 transition duration-800 ease-out w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed'/>
                            )
                    })
                }

            </div>
        </div>
    )
}