import { GetAuthUserDetails, GetAuthUserTokens } from "@/lib/auth/auth-handlers";
import { redirect } from "next/navigation";

export async function getEventDetails(eventID: number) {
  const userAuthTokens = await GetAuthUserTokens();
  if (userAuthTokens == null) {
    redirect("/login");
    return { message: "unauthorized" };
  }
  const userDetails = await GetAuthUserDetails();
  const response = await fetch(`${process.env.API_URL}/v1/events/details/${eventID}/`, {
    headers: { "Content-Type": "application/json", Authorization: userAuthTokens.authToken != undefined ? userAuthTokens.authToken : "" },
    method: "GET",
    next: { revalidate: 0, tags: ["users-full-cache", `user-${userDetails?.details.id}-organisations`] },
  });
  const resData = await response.json();

  return resData;
}
