import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";

/**
 * A button component that displays a dialog.
 *
 * @param {Object} props - The component props.
 * @param {string} props.name - Button display name.
 * @param {string} props.dialog - Dialog title to display in the dialog box.
 * @param {string} props.desc - Description to display inside the box.
 * @returns {JSX.Element} The rendered button component.
 */
export default function AlertModal(props) {
	return (
		<AlertDialog>
		<AlertDialogTrigger><Button> {props.name}</Button> </AlertDialogTrigger>
		<AlertDialogContent>
			<AlertDialogTitle>{props.dialog}</AlertDialogTitle>
			<AlertDialogDescription>{props.desc}</AlertDialogDescription>
		</AlertDialogContent>
		</AlertDialog>	
	)
}
