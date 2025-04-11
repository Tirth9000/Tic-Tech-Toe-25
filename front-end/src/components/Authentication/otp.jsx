import {
    OTPField,
    OTPFieldGroup,
    OTPFieldInput,
    OTPFieldSlot
  } from "~/components/ui/otp-field";
  
  export default function Otp(props) {
    return (
      <OTPField maxLength={6}>
        <OTPFieldInput {...props}/>
        <OTPFieldGroup>
          <OTPFieldSlot index={0} />
          <OTPFieldSlot index={1} />
          <OTPFieldSlot index={2} />
          <OTPFieldSlot index={3} />
        </OTPFieldGroup>
      </OTPField>
    );
  }
  