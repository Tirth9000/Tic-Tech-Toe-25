const sensorData = require('../models/sensorData');

const pushDataEventHandler = async (socket, data) => {
  const { id, value } = data;
  try {
    await sensorData.findByIdAndUpdate(
      id,  // this is the document's _id directly
      {
        $push: {
          readings: {
            timestamp: new Date(),
            value: value
          }
        }
      }
    );
    console.log("Saved data to db")
  } catch (error) {
    console.error(error)
    socket.emit("error", { message: "failed to save data", status: false })
  }

  socket.broadcast.emit('sensor_readings', { data });
}

const predictFailureRate = async (socket, data) => {
  const { id, values } = data;

  try {
    const res = await fetch("http://localhost:8080/api/predict_fail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: id,
        data: values
      })
    });

    if (!res.ok) {
      throw new Error("Failed to get prediction");
    }

    const body = await res.json();

    socket.emit("predict_failure_result", { message: "success", status: true, data: body });

  } catch (error) {
    console.error(error);
    socket.emit("predict_failure_error", { message: "Failed to save data", status: false });
  }
};

const addSensor = async (socket, data) => {
  try {
    await (new sensorData(data)
    ).save()

    socket.emit('add_sensor_error', {
      message: "success",
      status: true
    })

  } catch (error) {
    socket.emit('add_sensor_error', {
      message: error.message,
      status: false
    })
  }
}

const askAI = async (socket, data) => {
  try {
    const res = await fetch("http://localhost:8080/chat-response", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: data.id,
        message: data.message
      })
    });

    if (!res.ok) {
      console.log(res);
      throw new Error("Failed to get response from server");
    }

    const responseData = await res.json();

    socket.emit("ask_ai_success", {
      message: "AI responded",
      response: responseData
    });

  } catch (error) {
    console.log(error);
    socket.emit("ask_ai_error", {
      message: "Something went wrong... please try again"
    });
  }
};


module.exports = {
  pushDataEventHandler,
  predictFailureRate,
  addSensor,
  askAI
}