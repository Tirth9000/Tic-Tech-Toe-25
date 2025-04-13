const getDummyReadings = (min, max, outlierProb = 0.01, outlierPeakDiff = max ) =>{
    // console.log(outlierPeakDiff)
    return {
         sensor_id : 1,
         values : Array.from({ length: 100 }, () =>{ 
            const random = Math.random()* (max-min) + min

            const randomOutLierDelta = Math.random() >= 1-outlierProb ? Math.random()*(-max) + outlierPeakDiff : 0 
            return (random+randomOutLierDelta).toFixed(2) 
        })
    }   
}
export const addReadingsAsync = async (callback, min, max, outlierProb = 0.01, outlierPeakDiff = max,  interval= 1000) =>{
    const dummyReading = getDummyReadings(min, max,  outlierProb, outlierPeakDiff)
    const interval_callback = ()=>{
        const entry = dummyReading.values.shift()
        if(!entry) clearInterval(id)
        callback(entry)
    }
    interval_callback()
    const id = setInterval(interval_callback, interval)
}
