import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export function generateDatesFromYearBeginnning() {
    const firstDayOfTheYear = dayjs().tz("America/Sao_Paulo").startOf('year')
    const today = dayjs(new Date()).tz("America/Sao_Paulo").startOf('day').toDate()    
    const dates = []
    let compareDate = firstDayOfTheYear

    while(compareDate.isBefore(today) || compareDate.isSame(today)){
        dates.push(compareDate.toDate())
        compareDate = compareDate.add(1, 'day')
    }
    
    return dates.map(date => date)
}