// import Habit from "./components/Habit"
import '../styles/global.css' 
import {Header} from '../components/Header'
import { SummaryTable } from '../components/SummaryTable'
import '../lib/dayjs'
import { ModalNewHabit } from '../components/ModalNewHabit'
import { useCookies } from 'react-cookie'
import { api } from '../lib/axios'
import { PieChart, Pie } from 'recharts';


export function Dashboard(){
    const [cookiesUser] = useCookies(['user']);
    const user = cookiesUser['user'];
    const [cookiesToken] = useCookies(['token']);
    const Token = cookiesToken['token'];
    const data = [
      {
        "name": "Group A",
        "value": 400
      },
      {
        "name": "Group B",
        "value": 300
      },
      {
        "name": "Group C",
        "value": 300
      },
      {
        "name": "Group D",
        "value": 200
      },
      {
        "name": "Group E",
        "value": 278
      },
      {
        "name": "Group F",
        "value": 189
      }
    ];


  return (
      <div className='w-screen h-screen flex flex-col'>
        <div className="w-full flex flex-col bg-background text-white">
          <Header></Header>
        </div>
        <div className="w-full px-6 flex items-center">
          <SummaryTable /> 
          <div className="w-2/6  ">
          <PieChart width={400} height={400}>
            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" fill="#8884d8" />
          </PieChart>
          </div>
          
        </div>
        <div className='w-30 flex justify-center py-6'>
          <ModalNewHabit/>
        </div>
      </div>

    )
}