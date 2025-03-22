"use client";
import { useFormStatus } from "react-dom";
import { Alert, Button, Stack, TextInput } from "@mantine/core";
import { useActionState } from "react";
import { verifyOTP } from "@/lib/actions/users/verify-otp";
import RedirectClient from "@/components/RedirectClient";

const initialState = {
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} color="black" radius={"md"}>
      {pending ? "Loading.." : "Verify OTP"}
    </Button>
  );
}

const VerifyEmailForm = () => {
  const [state, formAction] = useActionState(verifyOTP, initialState);

  if (state.message == "Successfully verified") {
    return <RedirectClient redirect_to="/" />;
  }

  return (
    <form action={formAction}>
      <Stack>
        {state.message.length > 0 ? <Alert color="red" title={state.message}></Alert> : null}
        <TextInput name="otp" label="OTP" placeholder="Enter OTP" required />
        <SubmitButton />
      </Stack>
    </form>
  );
};

export default VerifyEmailForm;
