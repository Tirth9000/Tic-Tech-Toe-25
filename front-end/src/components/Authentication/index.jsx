import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import Signin from "./SignIn";
import Register from "./Register";

export function Authentication() {
	return (
		<section class="w-full grid place-items-center min-h-[75vh]" >
			<Tabs defaultValue="sign-in" class="w-[400px]">
				<TabsList class="grid w-full grid-cols-2">
					<TabsTrigger value="sign-in">Sign-in</TabsTrigger>
					<TabsTrigger value="register">Register</TabsTrigger>
				</TabsList>
				<TabsContent value="sign-in">
					<Signin />
				</TabsContent>
				<TabsContent value="register">
					<Register />
				</TabsContent>
			</Tabs>
		</section>
	);
}
