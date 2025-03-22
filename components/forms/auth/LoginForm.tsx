"use client";

import { login } from "../../../lib/actions/auth/login";
import { useFormStatus } from "react-dom";
import { Alert, Button, PasswordInput, Stack, TextInput } from "@mantine/core";
import { useActionState } from "react";
import RedirectClient from "@/components/RedirectClient";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} color="black" radius={"md"}>
      {pending ? "Loading.." : "Log In"}
    </Button>
  );
}

const LoginForm = (props: { next: string | null }) => {
  const initialState = {
    message: "",
    next: props.next,
  };
  const [state, formAction] = useActionState(login, initialState);

  if (state.message === "Logged In") {
    return <RedirectClient redirect_to="/" />;
  }

  return (
    <form action={formAction}>
      <Stack>
        {state.message.length > 0 ? <Alert color="red" title={state.message}></Alert> : null}
        <TextInput name="email" label="Email" placeholder="Email ID" required type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" />
        <PasswordInput name="password" label="Password" placeholder="Password" required />
        <SubmitButton />
      </Stack>
    </form>
  );
};

export default LoginForm;
