import { createEffect, createSignal, on, onMount } from "solid-js";
import { Portal } from "solid-js/web";
import { IconPlus } from "~/components/icons";
import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from "~/components/ui/card";
import { addReadingsAsync } from "~/utils/dummyData";

export const HomeComponent = () => {

	const [temperatureData, setTemperatureData] = createSignal([24])
	const [vibrationData, setVibrationData] = createSignal([50])
	const [voltageData, setVoltageData] = createSignal([5.0])
	const [lastUpdate, setLastUpdate] = createSignal(new Date().toLocaleTimeString())
	onMount(()=>{
		addReadingsAsync((val)=>setTemperatureData(curr=>[...curr.slice(temperatureData().length-11), val]), 20, 40)
		addReadingsAsync((val)=>setVibrationData(curr=>[...curr.slice(vibrationData().length-11), val]), 42, 55)
		addReadingsAsync((val)=>setVoltageData(curr=>[...curr.slice(voltageData().length-11), val]), 4.48, 5.89)
	})
	
	createEffect(()=>{
		voltageData()
		vibrationData()
		temperatureData() 
		setLastUpdate(new Date().toLocaleTimeString()) 
	})
	
	return (
		<div class="m-3">
			<h2 class="text-lg">System Overview</h2>
			<h4 class="text-gray-300 text-sm">Monitor your system health and statuses</h4>
			<div class="flex gap-2 my-3 w-full">
				<SystemStatsCard
                    description="System Health"
                    value='75 %'
                />
				<SystemStatsCard
                    description="Active Sensors"
                    value='4'
                />
				<SystemStatsCard
                    description="Anomalies"
                    value='1'
                />
				<SystemStatsCard
                    description="Maintenance"
                    value='0'
                />
				<Card class="hover:shadow-current">
					<CardDescription class="p-2 text-center">Add new node</CardDescription>
					<CardContent class="place-items-center grid p-0"><IconPlus 
						class='rounded-full size-6'
					/></CardContent>
				</Card>
			</div>
			<div>Sensors</div>
			<div class="gap-2 grid grid-cols-4">
				<SensorCard
					title="🌡️ Temperature"
					value={temperatureData()[temperatureData().length-1]}
					unit="°c"
					lastUpdate={lastUpdate()}
					status="NORMAL"
				/>
				<SensorCard
					title="📳 Vibration"
					value={vibrationData()[vibrationData().length-1]}
					lastUpdate={lastUpdate()}
					unit="Hz"
					status="NORMAL"
				/>
				<SensorCard 
				title="⚡ Voltage" 
				value={voltageData()[voltageData().length-1]} 
				unit="V" 	
				lastUpdate={lastUpdate()}
				status="NORMAL" />
			</div>
		</div>
	);
};

const SystemStatsCard = (props) => {
	return (
		<Card class="p-2">
			<CardDescription >{props.description}</CardDescription>
			<CardContent class="p-2 text-center">{props.value}</CardContent>
		</Card>
	);
};

const SensorCard = (props) => {
	return (
		<Card class="p-2 hover:scale-105 transition-transform ease-in" style={{
            "border-left": props.status==="NORMAL" ? "rgba(0,220,0, 0.5) 5px solid" :''
        }}
		>
			<CardTitle class="">
				{props.title}
			</CardTitle>
			<CardContent class="my-4 p-2 text-2xl">
				{props.value} <span class="text-s">{props.unit}</span>
			</CardContent>
			<CardDescription class="text-xs">
				Last updated at : {props.lastUpdate}{" "}
			</CardDescription>
		</Card>
	);
};
