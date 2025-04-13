# Predictive Maintenance System for Manufacturing

## 🚀 Overview

This project implements a **Predictive Maintenance System** tailored for industrial manufacturing setups. By leveraging sensor data and advanced machine learning techniques, the system forecasts equipment failures in advance—enabling proactive maintenance and minimizing costly downtimes.

## 📌 Problem Statement

Traditional maintenance follows fixed schedules that often ignore the actual health of the equipment. This can lead to unexpected failures, production halts, and increased costs. Our system addresses this by continuously monitoring sensor data and using a hybrid machine learning framework to detect anomalies and predict failures.

## 🔍 Key Features

- **Early Fault Detection**: Real-time anomaly detection using sensor analytics.
- **Predictive Forecasting**: Forecasts potential failures using supervised models.
- **Interactive Dashboard**: Real-time monitoring, alerting, and trend analysis.
- **Smart Maintenance Alerts**: Timely notifications for optimal repair windows.
- **Analytics Engine**: Visual representation of equipment performance over time.

## 🧠 System Architecture

### 1. Data Pipeline
- **Data Cleaning**: Manages missing or inconsistent values.
- **Resampling**: Aligns timestamps and aggregates data.
- **Normalization**: Ensures uniform data scaling.
- **Lag Feature Engineering**: Captures time-dependent behavior.
- **Anomaly Labelling**: Isolation Forest used to detect and label abnormal patterns.

### 2. Machine Learning Framework
- **Unsupervised Anomaly Detection**: Isolation Forest
- **Supervised Prediction Models**: Random Forest

### 3. Predictive Output Engine
- Predicts time-to-failure
- Classifies anomaly severity
- Generates maintenance recommendations

### 4. Interactive Dashboard
- **Sensor-Specific Visualizations**
- **System Health Overview**
- **Failure Risk Notifications**
- **Performance Trend Graphs**

## 🧰 Tech Stack

| Component         | Technology         |
|------------------|--------------------|
| **Backend**       | Node.js, Python (Microservices) |
| **Frontend**      | SolidJS, Chart.js  |
| **Database**      | MongoDB            |
| **Data Handling** | Pandas, NumPy, scikit-learn |

## 📈 Benefits

- Reduces unscheduled downtimes and repair costs
- Enables condition-based maintenance
- Prolongs equipment lifespan
- Enhances real-time operational visibility

## 📚 References

- [Anomaly Detection in Sensor Systems](https://www.sciencedirect.com/science/article/pii/S1570826824000076)
- [Interpretable Predictive Maintenance Models](https://www.sciencedirect.com/science/article/pii/S2215016125000299)
- [Sensor Fault Detection Data - Kaggle](https://www.kaggle.com/datasets/arashnic/sensor-fault-detection-data/code)
- [Engine Failure Detection - Kaggle](https://www.kaggle.com/datasets/ziya07/engine-failure-detection-dataset)
- [IoT-Based Equipment Fault Prediction - Kaggle](https://www.kaggle.com/datasets/programmer3/iot-based-equipment-fault-prediction-dataset)

## 👥 Contributors

- Pratik Rathod
- Tirth Sharma
- Umar Ansari
- Vraj Shah
- Aaditya Thakar