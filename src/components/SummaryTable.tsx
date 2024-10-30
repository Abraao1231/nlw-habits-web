import { useEffect, useRef } from "react"
import { generateDatesFromYearBeginnning } from "../utils/generate-range-betwen-dates"
import HabitDay from "./HabitDay"
import dayjs from "dayjs"
import '../styles/scrollbar.css'
import { useContext } from "react"
import { SummaryContext } from "../context/summaryContext"


import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import colors from "tailwindcss/colors"

dayjs.extend(utc);
dayjs.extend(timezone);

const weekDay = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const summaryDates = generateDatesFromYearBeginnning()
const habitLevelLabel = [
    {text: '0%', color: colors.zinc[900]},
    {text: '20%', color: colors.violet[900]},
    {text: '40%', color: colors.violet[800]},
    {text: '60%', color: colors.violet[700]},
    {text: '80%', color: colors.violet[600]},
    {text: '< 80%', color: colors.violet[500]}]
const minimumSummaryDaysSize = 10 * 7
const amountOfDayToFill = minimumSummaryDaysSize - summaryDates.length


export function SummaryTable() {
    
    const context = useContext(SummaryContext);

    if (!context) {
        throw new Error('SummaryTable must be used within a SummaryContext.Provider');
    }
    const { summary } = context;
    
    const endOfMessagesRef = useRef<HTMLDivElement | null>(null);
    
    useEffect(() => {
        
        if (endOfMessagesRef.current) {
            endOfMessagesRef.current.scrollLeft = endOfMessagesRef.current.scrollWidth; // Altera para scrollLeft
        }
    }, [summary]);
    
    return (
        <div className="w-full flex ">
            <div className=" grid grid-rows-7 grid-flow-row gap-3 ">
                {
                    weekDay.map((weekDay, index) => {
                        return <div key={`${weekDay}${index}`} className="text-zinc-400 text-xl h-7 w-7 flex items-center justify-center">
                            {weekDay}
                        </div>
                    })
                }

            </div>
            <div className='w-5/6 overflow-auto grid grid-rows-7 grid-flow-col gap-2  scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 p-1 pb-2'
                ref={endOfMessagesRef}
                style={{ scrollBehavior: 'smooth' }} // Adiciona rolagem suave
            >
                {
                    summary.summary.length > 0 &&
                    summaryDates.map(date => {

                        const dayInSummary = summary.summary.find(day => {
                            return dayjs(date).isSame(dayjs(day.date), 'day')
                        })


                        return (
                            <HabitDay
                                key={date.toString()}
                                date={date}
                                amount={dayInSummary?.amount}
                                defaultCompleted={dayInSummary?.completed}
                                disabled={true}
                            />
                        )
                    })
                }
                {
                    amountOfDayToFill > 0 && Array.from({ length: amountOfDayToFill }).map((_, index) => {
                        return (
                            <div key={index} className='group hover:scale-110 transition duration-800 ease-out w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed' />
                        )
                    })
                }

            </div>
            <div className="w-1/6 flex justify-center items-center">
                <div className="grid grid-rows-7 grid-flow-row gap-2 ">
                    {
                        habitLevelLabel.map((level, index) => {
                            return <div key={`${level}${index}`} className="flex gap-x-2">
                                        <span  
                                            style={{background: level.color}}
                                            className="rounded-md text-zinc-400 text-xl h-7 w-7 flex items-center justify-center"
                                            >    
                                        </span>
                                        {level.text}
                                    </div>
                        })
                    }

                </div>
            </div>
            
        </div>
    )
}