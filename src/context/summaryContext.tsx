

import { createContext, Dispatch, SetStateAction } from 'react';
import { SummaryData } from '../pages/Dashboard';
// Defina o tipo para o contexto
interface SummaryContextType {
  summary: SummaryData;
  setSummary: Dispatch<SetStateAction<SummaryData>>;
}

// Crie o contexto com um valor padrão
export const SummaryContext = createContext<SummaryContextType | undefined>(undefined);
