import { createEffect, createResource, createSignal, on, onMount, Show } from "solid-js";
import { Portal } from "solid-js/web";
import { IconPlus } from "~/components/icons";
import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from "~/components/ui/card";
import { LineChart, BarChart } from "~/components/ui/charts";
import { addReadingsAsync } from "~/utils/dummyData";
import { useIO } from "~/utils/socket.utils";

export const HomeComponent = () => {
	const [temperatureData, setTemperatureData] = createSignal([24,23,24,21,24,21,24,24,21,24]);
	const [vibrationData, setVibrationData] = createSignal([50,50,50,50,50,50,50,50,50,50]);
	const [voltageData, setVoltageData] = createSignal([5.0,5.0,5.0,5.0,5.0,5.0,5.0,5.0,5.0,5.0]);
	const [lastUpdate, setLastUpdate] = createSignal(
		new Date().toLocaleTimeString(),
	);
	onMount(() => {
		addReadingsAsync(
			(val) =>
				setTemperatureData((curr) => {
					if (curr.length < 10) {
						curr.push(val);
						return curr;
					}
					const last9 = curr.slice(-9);
					last9.push(val);
					return last9;
				}),
			42,
			44,
			0.7
		);
		addReadingsAsync(
			(val) =>
				setVibrationData((curr) => {
					if (curr.length < 10) {
						curr.push(val);
						return curr;
					}
					const last9 = curr.slice(-9);
					last9.push(val);
					return last9;
				}),
			42.1,
			45.2,
		);
		addReadingsAsync(
			(val) =>
				setVoltageData((curr) => {
					if (curr.length < 10) {
						curr.push(val);
						return curr;
					}
					const last9 = curr.slice(-9);
					last9.push(val);
					return last9;
				}),
			4.98,
			5.12,
		);
	});

	createEffect(() => {
		voltageData();
		vibrationData();
		temperatureData();
		setLastUpdate(new Date().toLocaleTimeString());
	});

	return (
		<div class="m-3">
			<h2 class="text-lg">System Overview</h2>
			<h4 class="text-gray-300 text-sm">
				Monitor your system health and statuses
			</h4>
			<div class="flex flex-wrap w-full">
				<SystemStatsCard description="System Health" value="GOOD" />
				<SystemStatsCard description="Active Sensors" value="3" />
				<SystemStatsCard description="Anomalies" value="1" />
				<SystemStatsCard description="Maintenance" value="0" />
				<Card class="hover:shadow-current">
					<CardDescription class="p-2 text-center">
						Add new node
					</CardDescription>
					<CardContent class="place-items-center grid p-0">
						<IconPlus class="rounded-full size-6" />
					</CardContent>
				</Card>
			</div>
			<div>Sensors</div>
			<div class="gap-2 grid grid-cols-2">

				<SensorCard
					title="🌡️ Temperature"
					value={temperatureData()[temperatureData().length - 1]}
					datasets={temperatureData()}
					unit="°c"
					lastUpdate={lastUpdate()}
					status="NORMAL"
				/>
				<SensorCard
					title="📳 Vibration"
					value={vibrationData()[vibrationData().length - 1]}
					datasets={vibrationData()}
					lastUpdate={lastUpdate()}
					unit="Hz"
					status="NORMAL"
				/>
				<SensorCard
					title="⚡ Voltage"
					value={voltageData()[voltageData().length - 1]}
					datasets={voltageData()}
					unit="V"
					lastUpdate={lastUpdate()}
					status="NORMAL"
				/>
			</div>
		</div>
	);
};

const SystemStatsCard = (props) => {
	return (
		<Card class="p-2">
			<CardDescription>{props.description}</CardDescription>
			<CardContent class="p-2 text-center">{props.value}</CardContent>
		</Card>
	);
};

const SensorCard = (props) => {
	const SensorChartPopup = () => {
		
		const getPrediction = async (sensor_id)=>{
			return new Promise((resolve, _reject)=>{
				useIO()?.on("predict_failure_result",(data)=>{
					// console.log(props.datasets)
					console.log(data)
					return resolve( data?.data?.probable.at(1) ? `${Number.parseFloat(data?.data?.probable.at(1)).toFixed(4)*100}` : "-")
				})
				useIO()?.on("predict_failure_error",()=>{
					return resolve("-")
				})
				// setTimeout(()=>	resolve("-"), 2500)
				console.log(props.datasets)
				useIO()?.emit("sensor_predict_failure_rate", {id:sensor_id, values:props.datasets})
			})
		}
		const [failureRate, { refetch}] = createResource(getPrediction)

		setInterval(()=>refetch(), 5000)

		return <Card class="h-[60%]">	
			<CardTitle class="p-2 uppercase"> {props.title}</CardTitle>
			<CardContent>
				<LineChart
					data={{
						labels: [
							...Array.from({ length: 14 }, (v, i) =>
								new Date(Date.now() - i * 1000).toLocaleTimeString(),
							).reverse(),
						],
						datasets: [
							{
								label: props.unit,
								data: props.datasets,
							},
						],
					}}
					options={{
						animation: false, // 👈 this disables animations
						responsive: true,
						plugins: {
							legend: {
								display: false,
							},
						},
						scales: {
							x: {
								display: true,
							},
							y: {
								display: true,
							},
						},
					}}
				/>
			</CardContent>
			<CardDescription class='text-lg'>
				{ failureRate() < 80 ? '🟢' : '🔴' } probability of failure {"(in next 10 readings...)"}: { failureRate.loading ? "loading.." : failureRate() } %
				<br />
			</CardDescription>
		</Card>;
	};

	return (
		<Card
			class="p-2 transition-transform ease-in"
			style={{
				"border-left":
					props.status === "NORMAL" ? "rgba(0,220,0, 0.5) 5px solid" : "",
			}}
		>
			<CardContent class="my-4 p-2 text-2xl">
				<SensorChartPopup/>
			</CardContent>
			<CardDescription class="text-xs">
				Last updated at : {props.lastUpdate}{" "}
			</CardDescription>
		</Card>
	);
};
