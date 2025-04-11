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
				<NavigationMenuTrigger as="A" href="/account" class='bg-red' >
					Dashboard
				</NavigationMenuTrigger>
			</NavigationMenu>
			<div class="flex justify-end w-full">
				<ModeToggle />
			</div>
		</div>
	);
}
