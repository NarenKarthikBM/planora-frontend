"use server";
import { SetAuthUserDetails, SetAuthUserTokens } from "@/lib/auth/auth-handlers";
import { convertPascalToNormal } from "@/lib/utils/conversions";
import { redirect } from "next/navigation";

export async function registration(prevState: { message: string }, formData: FormData) {
  const location = formData.get("city")
    ? formData.get("city") + ", " + convertPascalToNormal(formData.get("state") as string)
    : formData.get("state")
    ? convertPascalToNormal(formData.get("state") as string)
    : null;
  const data = {
    email: formData.get("email"),
    mobile_no: formData.get("mobile_no"),
    name: formData.get("name"),
    location: location,
    password: formData.get("password"),
  };

  const response = await fetch(`${process.env.API_URL}/v1/users/register/`, {
    cache: "no-store",
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });

  const resData = await response.json();

  if (response.status == 201) {
    await SetAuthUserDetails(resData["user_details"]);
    await SetAuthUserTokens(resData["tokens"]["auth_token"]);
    redirect("/verify_email");
    return {
      message: "Successfully registered",
    };
  } else {
    console.log(resData);
    if (resData.field == "email") {
      return {
        message: "User Already Exists!!",
      };
    }
    return {
      message: "Invalid Credentials!!",
    };
  }
}
