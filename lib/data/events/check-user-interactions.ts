import { GetAuthUserTokens } from "@/lib/auth/auth-handlers";
import { redirect } from "next/navigation";

export async function getEventUserInteractions(eventID: number) {
  const userAuthTokens = await GetAuthUserTokens();
  if (userAuthTokens == null) {
    redirect(`/login?next=/events/${eventID}/`);
    return { status: 403 };
  }
  const response = await fetch(`${process.env.API_URL}/v1/events/check-user-interactions/${eventID}/`, {
    headers: { "Content-Type": "application/json", Authorization: userAuthTokens.authToken != undefined ? userAuthTokens.authToken : "" },
    method: "GET",
    next: { revalidate: 0, tags: ["events-full-cache", "event-check-user-interactions"] },
  });
  const resData = await response.json();
  console.log(resData);

  return resData;
}
