const timeFormat = (minutes) => {
    const hours = Math.floor(minutes/60); 
    const minutedRemainder = minutes % 60;
    return `${hours}h ${minutedRemainder}m`
}

export default timeFormat