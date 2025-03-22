"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@mantine/core";
import { useActionState } from "react";

import { rsvpEvent } from "@/lib/actions/events/rsvp-event";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button w={"100%"} type="submit" disabled={pending} color="rgba(120, 135, 255, 0.85)" radius={"md"}>
      {pending ? "..." : "Yes"}
    </Button>
  );
}

const RSVPEventForm = (props: { eventID: number }) => {
  const initialState = {
    message: "",
    eventID: props.eventID,
  };
  const [status, formAction] = useActionState(rsvpEvent, initialState);

  return (
    <form action={formAction}>
      <SubmitButton />
    </form>
  );
};

export default RSVPEventForm;
