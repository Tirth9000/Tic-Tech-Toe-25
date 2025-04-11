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
import Otp from "./otp";
import { register, sendOtp } from "~/lib/auth";
import { createSignal } from "solid-js";
import { reload, useNavigate } from "@solidjs/router";

export default function Register() {
	const navigate = useNavigate()
	const [repeatPasswordError, setRepeatPasswordError] = createSignal('')
	let nameInput;
	let emailInput;
	let otpButton;
	let otpInput;
	let password;
	let password_repeat;
	let submitButton;
	const handleGetOTP = async () => {
		otpButton.setAttribute("disabled", "");
		otpButton.textContent = "resend after 15s";
		setTimeout(
			() => {
				otpButton.textContent = "Get OTP";
				otpButton.removeAttribute("disabled");
			}
			, 15000);
		try {
			const message = await sendOtp(emailInput.value);
			alert(message.message);
		} catch (error) {
			alert(error.message);
		}
	};
	const handleOTPButton = (e) => {
		// if email is empty disable the get OTP button
		if (!emailInput.value.trim()) otpButton.setAttribute("disabled", "");
		// else enable the get OTP button
		else otpButton.removeAttribute("disabled");
	};
	const handleSubmitButton = (e) => {
		if (otpInput.value.trim().length !== 4)
			submitButton.setAttribute("disabled", "");
		// else enable the get OTP button
		else submitButton.removeAttribute("disabled");
	};
	const matchPassword = () => {
		if (password.value !== password_repeat.value) {
			setRepeatPasswordError("passwords did not match")
			submitButton.setAttribute("disabled", "");
		} else {
			setRepeatPasswordError("")
			submitButton.removeAttribute("disabled");
		}
	}
	const handleRegister = async (e) => {
		e.preventDefault()
		const body = {
			user_name: nameInput.value,
			email: emailInput.value,
			otp: otpInput.value,
			password: password.value
		}
		try {
			const data = await register(body.user_name, body.email, body.password, body.otp)
			console.log(data)
			reload()
			useNavigate('/account', { replace: true })
		} catch (error) {
			console.log(error)
			alert('Error', error.message)
		}
	}

	return (
		<Card>
			<form class="space-y-2" onSubmit={handleRegister}>
				<CardHeader>
					<CardTitle>Register</CardTitle>
					<CardDescription>Create account for new users!</CardDescription>
				</CardHeader>
				<CardContent class="space-y-2">
					<TextField class="space-y-1">
						<TextFieldLabel for="user_name">
							Username
						</TextFieldLabel>
						<TextFieldInput
							autocomplete="user_name"
							name="user_name"
							type="user_name"
							ref={nameInput}
							required
						/>
					</TextField>
					<TextField class="space-y-1">
						<div class="flex items-bottom gap-2">
							<div>

								<TextFieldLabel for="email">
									Email-id
								</TextFieldLabel>
								<TextFieldInput
									autocomplete="email"
									name="email"
									type="email"
									onInput={handleOTPButton}
									ref={emailInput}
									required
								/>
							</div>
							<Button
								class="self-end"
								type="button"
								onClick={handleGetOTP}
								ref={otpButton}
								disabled
							>
								Get OTP
							</Button>
						</div>
					</TextField>
					<TextField class="space-y-1">
						<TextFieldLabel for="otp">OTP</TextFieldLabel>
						<Otp
							onInput={handleSubmitButton}
							name="otp"
							ref={otpInput}
							required
						/>
					</TextField>
					<TextField class="space-y-1">
						<TextFieldLabel for="password">
							Set Password
						</TextFieldLabel>
						<TextFieldInput
							ref={password}
							onInput={matchPassword}
							autocomplete="password"
							name="password"
							type="password"
							required
						/>
					</TextField>
					<TextField class="space-y-1">
						<TextFieldLabel for="password-repeat">
							Repeat Password
						</TextFieldLabel>
						<TextFieldInput
							ref={password_repeat}
							onInput={matchPassword}
							name="password-repeat"
							type="password"
							autocomplete="off"
							required
						/>
						<span class="bg-error-foreground text-xs">{repeatPasswordError()}</span>
					</TextField>

				</CardContent>
				<CardFooter>
					<Button type="submit" ref={submitButton} disabled>
						Submit
					</Button>
				</CardFooter>
			</form>
		</Card>
	);
}