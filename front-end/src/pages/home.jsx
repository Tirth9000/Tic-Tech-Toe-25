import { createEffect, createSignal, on, onMount, Show } from "solid-js";
import { Portal } from "solid-js/web";
import { IconPlus } from "~/components/icons";
import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from "~/components/ui/card";
import { LineChart } from "~/components/ui/charts";
import { addReadingsAsync } from "~/utils/dummyData";

export const HomeComponent = () => {
	const [temperatureData, setTemperatureData] = createSignal([24]);
	const [vibrationData, setVibrationData] = createSignal([50]);
	const [voltageData, setVoltageData] = createSignal([5.0]);
	const [lastUpdate, setLastUpdate] = createSignal(
		new Date().toLocaleTimeString(),
	);
	onMount(() => {
		addReadingsAsync(
			(val) =>
				setTemperatureData((curr) =>{
					if(curr.length<10){
						curr.push(val)
						return curr
					}
					const last9 = curr.slice(-9)
					last9.push(val)
					return last9
				}),
			42,
			44
		);
		addReadingsAsync(
			(val) =>
				setVibrationData((curr) =>{	
					if(curr.length<10){
						curr.push(val)
						return curr
					}
					const last9 = curr.slice(-9)
					last9.push(val)
					return last9
				}),
			42.1,
			45.2
		);
		addReadingsAsync(
			(val) =>
				setVoltageData((curr) =>{
					
					if(curr.length<10){
						curr.push(val)
						return curr
					}
					const last9 = curr.slice(-9)
					last9.push(val)
					return last9
				}),
			4.98,
			5.12
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
			<div class="flex gap-2 my-3 w-full">
				<SystemStatsCard description="System Health" value="75 %" />
				<SystemStatsCard description="Active Sensors" value="4" />
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
			<div class="gap-2 grid grid-cols-4">
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
	const [show, setShow] = createSignal(false);
	let modalRef;
	let cardRef;

	const popUpModal = () => {
		setShow(true);
		console.log("open");
	};

	onMount(() => {
		document.addEventListener("click", (e) => {
			console.log(cardRef?.contains(e.target) || e.target === cardRef);

			if (cardRef?.contains(e.target) || e.target === cardRef)
				return setShow(true);

			return setShow(false);
		});
	});

	return (
		<Card
			ref={cardRef}
			class="p-2 hover:scale-105 transition-transform ease-in"
			style={{
				"border-left":
					props.status === "NORMAL" ? "rgba(0,220,0, 0.5) 5px solid" : "",
			}}
			onClick={() => popUpModal()}
		>
			<CardTitle class="">{props.title}</CardTitle>
			<CardContent class="my-4 p-2 text-2xl">
				{props.value} <span class="text-s">{props.unit}</span>
			</CardContent>
			<CardDescription class="text-xs">
				Last updated at : {props.lastUpdate}{" "}
			</CardDescription>
			<Portal>
				<Card
					ref={modalRef}
					class="absolute backdrop:bg-opacity-35"
					style={{
						opacity: show() ? "1" : "0",
						"z-index": show() ? "1" : "-1",
						"user-select": show() ? "inherit" : "true",
						inset: "20vw",
						top: show() ? "20px" : "0px",
						transition: "all 500ms 1ms ease-in-out",
					}}
				>
					<CardTitle class="p-2 uppercase"> {props.title}</CardTitle>
					<CardContent>
						<LineChart
							data={{
								labels: [
									...Array.from({ length: 10 }, (v, i) =>
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
				</Card>
			</Portal>
		</Card>
	);
};
