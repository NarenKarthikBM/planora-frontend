import { GetAuthUserTokens } from "@/lib/auth/auth-handlers";
import { redirect } from "next/navigation";

export async function getOrganisationCommitteeMembers(organisationID: number) {
  const userAuthTokens = await GetAuthUserTokens();
  if (userAuthTokens == null) {
    redirect("/login");
    return { message: "unauthorized" };
  }
  // const userDetails = await GetAuthUserDetails();
  const response = await fetch(`${process.env.API_URL}/v1/users/organisation-committee-member-list/${organisationID}/`, {
    headers: { "Content-Type": "application/json", Authorization: userAuthTokens.authToken != undefined ? userAuthTokens.authToken : "" },
    method: "GET",
    next: { revalidate: 0, tags: ["users-full-cache", `organisation-${organisationID}-member`] },
  });
  const resData = await response.json();

  return resData;
}
