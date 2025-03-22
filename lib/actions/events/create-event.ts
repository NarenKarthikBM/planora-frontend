"use server";

import { GetAuthUserTokens } from "@/lib/auth/auth-handlers";
import { convertPascalToNormal } from "@/lib/utils/conversions";
import { redirect } from "next/navigation";

export async function createEvent(
  prevState: {
    message: string | null;
    organisationID: number;
  },
  formData: FormData
) {
  const userAuthTokens = await GetAuthUserTokens();
  console.log(prevState);
  if (userAuthTokens == null) {
    redirect("/login");
    return { message: "unauthorized", organisationID: prevState.organisationID };
  }

  const location = formData.get("city")
    ? formData.get("city") + ", " + convertPascalToNormal(formData.get("state") as string)
    : formData.get("state")
    ? convertPascalToNormal(formData.get("state") as string)
    : null;
  const data = {
    name: formData.get("name"),
    location: location,
    type: formData.get("type"),
    category: formData.get("category"),
    start_datetime: formData.get("start_datetime"),
    end_datetime: formData.get("end_datetime"),
    description: formData.get("description"),
    tags: [],
    latitude: "0.0",
    longitude: "0.0",
  };

  console.log(data);

  const response = await fetch(`${process.env.API_URL}/v1/events/create/${prevState.organisationID}/`, {
    cache: "no-store",
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json", Authorization: userAuthTokens.authToken != undefined ? userAuthTokens.authToken : "" },
  });

  const resData = await response.json();
  console.log(resData);

  if (response.status == 201) {
    redirect(`/dashboard/events/${resData.details.id}/edit`);
    return {
      message: "Successfully created",
      organisationID: prevState.organisationID,
    };
  } else {
    return {
      message: "Oops Something went wrong",
      organisationID: prevState.organisationID,
    };
  }
}
