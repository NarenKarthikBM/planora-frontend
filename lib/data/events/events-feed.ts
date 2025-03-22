import { GetAuthUserDetails, GetAuthUserTokens } from "@/lib/auth/auth-handlers";
import { redirect } from "next/navigation";

export async function getEventsPublicFeed(pageNo: number, query: string, category: string) {
  const response = await fetch(`${process.env.API_URL}/v1/events/public-feed/?page_no=${pageNo}${query ? `&search=${query}` : ""}${category ? `&category=${category}` : ""}`, {
    headers: { "Content-Type": "application/json" },
    method: "GET",
    next: { revalidate: 0, tags: ["events-full-cache", "events-public-feed-cache"] },
  });
  const resData = await response.json();

  return resData;
}

export async function getEventsPersonalisedFeed(pageNo: number, query: string, category: string) {
  const userAuthTokens = await GetAuthUserTokens();
  if (userAuthTokens == null) {
    redirect("/login");
    return { message: "unauthorized" };
  }
  const userDetails = await GetAuthUserDetails();
  const response = await fetch(`${process.env.API_URL}/v1/events/personalised-feed/?page_no=${pageNo}${query ? `&search=${query}` : ""}${category ? `&category=${category}` : ""}`, {
    headers: { "Content-Type": "application/json", Authorization: userAuthTokens.authToken != undefined ? userAuthTokens.authToken : "" },
    method: "GET",
    next: { revalidate: 0, tags: ["events-full-cache", `events-personalised-user-${userDetails?.details.id}-feed-cache`] },
  });
  const resData = await response.json();

  return resData;
}
