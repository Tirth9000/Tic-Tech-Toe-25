const getDummyReadings = (min, max) =>{
    return {
         sensor_id : 1,
         values : Array.from({ length: 1000 }, () => (Math.random() * min + (max-min)).toFixed(2))
    }   
}
export const addReadingsAsync = async (callback, min, max, interval= 5000) =>{
    const dummyReading = getDummyReadings(min, max)
    console.log(dummyReading)
    const id = setInterval(()=>{
        const entry = dummyReading.values.shift()
        if(!entry) clearInterval(id)
        callback(entry)
    }, interval)
}