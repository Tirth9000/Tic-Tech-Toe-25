// import { API_HOST} from "./lib/auth";
import {
	ColorModeProvider,
	ColorModeScript,
	createLocalStorageManager,
} from "@kobalte/core";
import { Route, Router } from "@solidjs/router";
import NavigationBar from "./components/NavigationBar/NavigationBar";
// import { Authentication } from "./components/Authentication/index";
function Home(){
	return (
		<>This is the Home page of the website</>
	)
}
function App() {
	const storageManager = createLocalStorageManager("vite-ui-theme");
	return (
		<>
			<ColorModeScript storageType={storageManager.type} />
			<ColorModeProvider storageManager={storageManager}>
				<NavigationBar />
				<Router>
					<Route path="/" component={Home} />
				</Router>
			</ColorModeProvider>
		</>
	);
}
export default App;
