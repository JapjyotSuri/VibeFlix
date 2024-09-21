const LEADING_ZERO_FORMATTER=new Intl.NumberFormat(undefined,{//Intl.NumberFormat is a built-in JavaScript object that helps format numbers according to a specific language and region.
    //the undefine din the above line means that that to locale is going to be the current locale of the browser
    minimumIntegerDigits: 2,//ensures that the formatted number will have at least 2 digits
    //the work of the above is to formate minutes and seconds in such a way that they are always 2 digits like lets say my seconds is 5 and minutes are 6 now we cant displat it as 6:5
    // so by putting the above option it adds a 0 infront of 5 this is the work of the above and now the output will be 6:05
})
export function formatDuration(duration: number){
    if (duration < 0) {
        return "00:00";  // Adding an edge case if somehow duration is less than zero
    }
    const hours=Math.floor(duration/60/60)//duration here is in seconds
    const minutes=Math.floor((duration - hours*60*60)/60)
    const seconds=duration%60//calculating number of seconds

    if(hours > 0){
        return `${hours}:${LEADING_ZERO_FORMATTER.format(minutes)}:${LEADING_ZERO_FORMATTER.format(seconds)}`
    }
    else{
        return `${minutes}:${LEADING_ZERO_FORMATTER.format(seconds)}`
    }
}
