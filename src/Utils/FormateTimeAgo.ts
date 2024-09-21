const formatter = new Intl.RelativeTimeFormat(undefined,{numeric: 'auto'})//here it automatically decides if we want to write the output in number form or string like 1 day ago or yesterday
// english.format(-2, "days") this means 2 days ago
//first parameter is the number of days or hours and the 2nd parameter tells us ehat is the duration is it a day or hour or year,etc
const DIVISIONS = [//we are making this because we want to take the largest parameter possible lets say the diff between dates is 2 weeks now i want it to show 2 weeks not 14 days
    { amount: 60, name: "seconds" },
    { amount: 60, name: "minutes" },
    { amount: 24, name: "hours" },
    { amount: 7, name: "days" },
    { amount: 4.34524, name: "weeks" },
    { amount: 12, name: "months" },
    { amount: Number.POSITIVE_INFINITY, name: "years" },
  ]
export function FormateTimeAgo(date: Date){
    let duration = (date.getTime() - new Date().getTime()) / 1000//converting from milliseconds to seconds here

    for (let i = 0; i < DIVISIONS.length; i++) {
      const division = DIVISIONS[i]
      if (Math.abs(duration) < division.amount) {//If this is true it means we have reached the largest division possible and we should return our formatted string using the current duration and division.
        return formatter.format(Math.round(duration), division.name as Intl.RelativeTimeFormatUnit)//as Intl.RelativeTimeFormatUnit added this here as it was giving me type error
      }
      duration /= division.amount
    }
  }
