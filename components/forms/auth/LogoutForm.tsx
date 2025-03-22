"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@mantine/core";
import { useActionState } from "react";
import { logout } from "@/lib/actions/auth/logout";

const initialState = {
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button w={"100%"} type="submit" disabled={pending} color="red.7" radius={"md"}>
      {pending ? "Logging Out.." : "Log Out"}
    </Button>
  );
}

const LoginForm = () => {
  const [, formAction] = useActionState(logout, initialState);

  return (
    <form action={formAction}>
      <SubmitButton />
    </form>
  );
};

export default LoginForm;
