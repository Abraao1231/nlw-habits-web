// import Habit from "./components/Habit"
import '../styles/global.css' 
import {Header} from '../components/Header'
import { SummaryTable } from '../components/SummaryTable'
import '../lib/dayjs'
import { ModalNewHabit } from '../components/ModalNewHabit'
import { useCookies } from 'react-cookie'
import { api } from '../lib/axios'
import { SummaryContext } from '../context/summaryContext'
import { useState, useEffect } from 'react'
import DashboardChart from '../components/DashboardChart'
import DashboardHabitList from '../components/DashboardHabitList'

export type summaryType = {
  id: string,
  date: Date,
  amount: number,
  completed: number
  }[]

export type SummaryData = {
    summary: summaryType,
    data: {}
  }
  

export function Dashboard(){
  
    const [cookiesToken] = useCookies(['token']);
    const Token = cookiesToken['token'];
  
    
    const [summary, setSummary] = useState<SummaryData>({
      summary: [], // Array vazio para `summary`
      data: {}  
    })


  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get('summary', { headers: { Authorization: `Bearer ${Token}` } });          
      setSummary(response.data);
    };
    fetchData();
   
  }, []);
  
  return (
    <SummaryContext.Provider value={{ summary, setSummary }}>
        <div className='w-full h-full flex flex-col'>
          <div className="w-full flex flex-col bg-background text-white">
            <Header/>
          </div>
          <div className="w-full px-6 flex items-center">
              <div className='px-8 py-4 w-full'>
                <h1 className='text-[60px] font-black w-1/2 leading-none py-2' >Acompanhe seu progresso !</h1>
                <h2 className='text-[30px] text-zinc-400 py-2'>Para cadastrar um novo hábito <ModalNewHabit component={< h2 className='text-violet-700 underline hover:text-violet-500'>clique aqui</h2>}/></h2>
              </div>
          </div>
          <div className='w-full px-14  flex md:flex-row sm:flex-col'>
                <div className='w-1/2'><DashboardHabitList/></div>
                <div className='w-1/2'><DashboardChart/></div>
          </div>
          
          <span className='w-full block bg-zinc-500 h-[1px]'></span>

          <div className='w-full px-14 justify-center p-6'>
            <h3 className='text-[34px] font-semibold'>Hábitos 2024</h3>
            <SummaryTable/>
          </div>
        </div>
      </SummaryContext.Provider>
    )
}