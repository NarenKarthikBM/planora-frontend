"use client";

import { Button, ButtonProps } from "@mantine/core";

interface SubmitButtonProps extends ButtonProps {
  text: string;
  pending: string;
}

export function SubmitButton(props: SubmitButtonProps) {
  return (
    <Button {...props} type="submit" loading={props.pending == "true"}>
      {props.text}
    </Button>
  );
}
