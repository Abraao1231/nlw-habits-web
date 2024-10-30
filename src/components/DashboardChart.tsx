import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Tooltip,
  Legend,
} from 'recharts';
import { useState, useEffect, useContext } from 'react';
import colors from 'tailwindcss/colors';
import { SummaryContext } from '../context/summaryContext';

const data = [
    { subject: 'Domingo', A: 110 },
    { subject: 'Segunda', A: 120 },
    { subject: 'Terça', A: 130 },
    { subject: 'Quarta', A: 140 },
    { subject: 'Quinta', A: 90 },
    { subject: 'Sexta', A: 110 },
    { subject: 'Sábado', A: 90 },
];

// Componente de Tooltip Personalizado
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-800 border border-violet-600 p-2 rounded shadow-lg">
        <h4 className="font-semibold">{`Dia: ${payload[0].payload.subject}`}</h4>
        <h4 className="text-zinc-300 font-semibold">{`Hábitos: ${payload[0].value}`}</h4>
      </div>
    );
  }
  return null;
};

export default function DashboardChart() {

  const context = useContext(SummaryContext);

  if (!context) {
      throw new Error('SummaryTable must be used within a SummaryContext.Provider');
  }
  const { summary } = context;
if (summary.chart)  
  for (let index = 0; index < data.length; index++) {
    data[index] = {
      subject: data[index].subject,
      A: summary.chart[index] ? summary.chart[index] : 0
    }
    
  }  
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // Função para atualizar o tamanho da tela
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Adiciona o listener de redimensionamento da janela
    window.addEventListener('resize', handleResize);

    // Remove o listener quando o componente desmonta
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="flex flex-col  items-center scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
      <h2 className="text-3xl font-bold text-center">Resumo semanal</h2>
      <RadarChart outerRadius={130} width={350} height={350} data={data}>
        <PolarGrid opacity={0.5} stroke={colors.violet[800]} />
        <PolarAngleAxis  dataKey="subject" fontSize={12} stroke={colors.zinc[300]} />
        <Radar isAnimationActive={true} legendType='circle' height={500} name="Hábitos no dia (%)" dataKey="A" stroke={colors.violet[500]} fill={colors.violet[800]} fillOpacity={0.8} />
        <Legend />
        {/* Use o CustomTooltip no Tooltip */}
        <Tooltip content={<CustomTooltip />} />
      </RadarChart>
    </div>
  );
}
