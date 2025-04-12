import { Grid, Col } from "~/components/ui/grid";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import { createResource, Show } from "solid-js";
import { Skeleton } from "../components/ui/skeleton";
export const ModelPage = () => {
	const [modelDetails] = createResource(async () => {
            //return await (await fetch("http://localhost:8000/model")).json();
	});
	return (
		<Show
			when={modelDetails.state === "ready"}
			fallback={<Skeleton height={400} class="rounded-md" />}
		>
			<Grid cols={1} colsMd={2} class="gap-2 w-full">
				<Col span={1} spanMd={1}>
					<Card>
						<CardHeader>
                            
							<CardTitle>Model Version</CardTitle>
						</CardHeader>
						<CardContent>0.0.1 </CardContent>
					</Card>
				</Col>
				<Card>
					<CardHeader>
						<CardTitle>Size</CardTitle>
					</CardHeader>
					<CardContent>XXX</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Accuracy</CardTitle>
					</CardHeader>
					<CardContent>XX %</CardContent>
				</Card>
			</Grid>
		</Show>
	);
};
