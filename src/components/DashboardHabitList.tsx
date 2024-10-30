import { useContext, useState } from "react";
import { SummaryContext } from "../context/summaryContext";
import { HabitsList } from "./HabitsList";
import dayjs from "dayjs";
import { Progressbar } from "./ProgressBar";

export default function DashboardHabitList(){
    const today = new Date()
    const dayAndMonth = dayjs(today).format('DD/MM')
    const dayOfWeek = dayjs(today).format('dddd')
    const [completed, setCompleted] = useState(0)


    function handleCompletedChange(completed: number){   
         
        setCompleted(completed);        
    }
    const context = useContext(SummaryContext);
    if (!context) {
        throw new Error('SummaryTable must be used within a SummaryContext.Provider');
    } 
        
    
    return (
        <div>
            <h1 className="text-4xl font-semibold">Seu progresso hoje !</h1>
            <h2>{dayAndMonth} - {dayOfWeek}</h2>
            <div className="pt-4">
                <HabitsList date={today} onCompletedChange={handleCompletedChange} disable={false}/>
            </div>
        </div>
    )
}