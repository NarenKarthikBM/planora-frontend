"use server";
import { GetAuthUserTokens } from "@/lib/auth/auth-handlers";
import { redirect } from "next/navigation";

export async function rsvpEvent(
  prevState: {
    message: string | null;
    eventID: number;
  },
  formData: FormData
) {
  const userAuthTokens = await GetAuthUserTokens();
  if (userAuthTokens == null) {
    redirect("/login");
    return { status: 403 };
  }
  const response = await fetch(`${process.env.API_URL}/v1/events/rsvp/${prevState.eventID}/`, {
    cache: "no-store",
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: userAuthTokens.authToken != undefined ? userAuthTokens.authToken : "" },
  });
  if (response.ok) {
    redirect(`/events/${prevState.eventID}`);
  } else {
    const errorData = await response.json();
    console.error("Failed to publish event:", errorData);
    return {
      message: "Failed to publish event",
      eventID: prevState.eventID,
    };
  }
}
