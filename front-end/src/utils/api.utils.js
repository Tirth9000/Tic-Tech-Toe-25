import { useIO } from "./socket.utils"

const getAllSensorData = async ()=>{
    try {
        const res = await fetch("")
        if(!res.ok){
            console.log(res)
            throw new Error("Error in http req. ", res.status)
        }
        return await res.json()
    } catch (error) {
        console.error(error)
        return false
    }
}

const handlePushDataToSensor = async (resolve)=>{
    useIO()?.on('data_reading_success', resolve)
    useIO()?.on('data_reading_error', reject)
    useIO()?.emit("all-bookings", {})
}