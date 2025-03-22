"use server";

import { GetAuthUserTokens } from "@/lib/auth/auth-handlers";
import { convertPascalToNormal } from "@/lib/utils/conversions";
import { redirect } from "next/navigation";

export async function createOrganisation(prevState: { message: string }, formData: FormData) {
  const userAuthTokens = await GetAuthUserTokens();
  if (userAuthTokens == null || userAuthTokens.authToken == undefined) {
    redirect("/login");
    return { message: "unauthorized" };
  }

  const location = formData.get("city")
    ? formData.get("city") + ", " + convertPascalToNormal(formData.get("state") as string)
    : formData.get("state")
    ? convertPascalToNormal(formData.get("state") as string)
    : null;
  const data = {
    name: formData.get("name"),
    email: formData.get("contact_email"),
    location: location,
    tags: [],
    description: formData.get("description"),
  };

  const response = await fetch(`${process.env.API_URL}/v1/users/create-organisation/`, {
    cache: "no-store",
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json", Authorization: userAuthTokens.authToken != undefined ? userAuthTokens.authToken : "" },
  });

  // console.log(await response.text());
  const resData = await response.json();
  console.log(resData);

  if (response.status == 201) {
    return {
      message: "Successfully created",
    };
  } else {
    return {
      message: "Oops Something went wrong",
    };
  }
}
