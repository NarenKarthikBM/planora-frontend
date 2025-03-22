"use server";

import { GetAuthUserTokens } from "@/lib/auth/auth-handlers";
import { convertPascalToNormal } from "@/lib/utils/conversions";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function editEvent(
  prevState: {
    message: string | null;
    eventID: number;
  },
  formData: FormData
) {
  const userAuthTokens = await GetAuthUserTokens();
  console.log(prevState);
  if (userAuthTokens == null) {
    redirect("/login");
    return { message: "unauthorized", eventID: prevState.eventID };
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

  const response = await fetch(`${process.env.API_URL}/v1/events/edit/${prevState.eventID}/`, {
    cache: "no-store",
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json", Authorization: userAuthTokens.authToken != undefined ? userAuthTokens.authToken : "" },
  });

  const resData = await response.json();
  console.log(resData);

  if (response.status == 200) {
    revalidateTag("events-full-cache");
    // redirect(`/dashboard/events/${resData.details.id}/edit`);
    return {
      message: "Successfully edited",
      eventID: prevState.eventID,
    };
  } else {
    return {
      message: "Oops Something went wrong",
      eventID: prevState.eventID,
    };
  }
}
