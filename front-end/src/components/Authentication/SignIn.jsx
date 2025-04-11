import { redirect, useNavigate } from "@solidjs/router";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import {
	TextField,
	TextFieldInput,
	TextFieldLabel,
} from "~/components/ui/text-field";
import { getFormDataObject, login, setItemWithExpiry } from "~/lib/auth";

export default function SignIn() {
	const navigate = useNavigate()
	let submitBtn;
	let emailInput;
	let passwordInput;
	const handleSubmit = async (e) => {
		e.preventDefault()
		e.submitter.setAttribute('disabled', '')
		setTimeout(() => e.submitter.removeAttribute('disabled'), 1000)
		const data = getFormDataObject(e.target, e.submitter)
		console.log(data)
		if (!data.email || !data.password) { alert('invalid email or password'); return; }
		try {
			const res = await login(data.email, data.password)
			const { refresh, access, message } = res;
			setItemWithExpiry("token", access, 24 * 60 * 60 * 1000)
			setItemWithExpiry("refresh", refresh, 7 * 24 * 60 * 60 * 1000)
			alert(message)
			navigate('/text-annotation', { replace: 'true' })
		} catch (error) {
			console.log(error)
			alert('invalid email or password')
		}
	}
	const handleSubmitButton = e => {
		const special_chars = ['/', '[', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', ',', '.', '?', ':', '{', '}', '|', '<', '>', ']'];
		const containsSpecialChar = passwordInput.value.split('').some((c) => special_chars.includes(c));

		(passwordInput.value.length < 8 || !containsSpecialChar)
			&&
			(emailInput.value.length) ? submitBtn.setAttribute('disabled', '') : submitBtn.removeAttribute('disabled')
	}
	return (
		<Card>
			<form class="space-y-2 contents" onSubmit={handleSubmit}>
				<CardHeader>
					<CardTitle>Sign-in</CardTitle>
					<CardDescription>
						Make sure you have an account!
					</CardDescription>
				</CardHeader>
				<CardContent class="space-y-2">

					<TextField class="space-y-1">
						<TextFieldLabel>Email-id</TextFieldLabel>
						<TextFieldInput autocomplete="email" placeholder="e-mail" name='email' type="email" ref={emailInput} />
					</TextField>
					<TextField class="space-y-1">
						<TextFieldLabel>Password</TextFieldLabel>
						<TextFieldInput
							autocomplete="password"
							ref={passwordInput}
							onInput={handleSubmitButton}
							placeholder="password"
							name="password"
							type="password"
						/>
					</TextField>

				</CardContent>
				<CardFooter>
					<Button type='submit' ref={submitBtn} disabled>Sign-In</Button>
				</CardFooter>
			</form>
		</Card>
	);
}
