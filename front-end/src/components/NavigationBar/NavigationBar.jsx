import {
	NavigationMenu,
	NavigationMenuTrigger,
} from "~/components/ui/navigation-menu";
import { ModeToggle } from "../ModeToggle/ModeToggle";
import "./style.css"

export default function NavigationBar() {
	return (
		<div class="flex p-2 w-full">
			<NavigationMenu>
				<NavigationMenuTrigger as="A" href="/" class='bg-red' >
					Home
				</NavigationMenuTrigger>
				<NavigationMenuTrigger as="A" href="/dashboard" class='bg-red' >
					Dashboard
				</NavigationMenuTrigger>
			</NavigationMenu>
			<div class="flex justify-end w-full">
				<ModeToggle />
			</div>
		</div>
	);
}
