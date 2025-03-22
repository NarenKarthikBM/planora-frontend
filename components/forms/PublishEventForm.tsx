"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@mantine/core";
import { useActionState } from "react";
import { publishEvent } from "@/lib/actions/events/publish-event";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button w={"100%"} type="submit" disabled={pending} color="rgba(120, 135, 255, 0.85)" radius={"md"}>
      {pending ? "Publishing..." : "Publish Event"}
    </Button>
  );
}

const PublishEvent = (props: { eventID: number }) => {
  const initialState = {
    message: "",
    eventID: props.eventID,
  };
  const [status, formAction] = useActionState(publishEvent, initialState);

  console.log(props.eventID);
  return (
    <form action={formAction}>
      <SubmitButton />
    </form>
  );
};

export default PublishEvent;
