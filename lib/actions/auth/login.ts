"use server";
import { SetAuthUserDetails, SetAuthUserTokens } from "@/lib/auth/auth-handlers";
import next from "next";
import { redirect } from "next/navigation";

export async function login(prevState: { message: string; next: string | null }, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const response = await fetch(`${process.env.API_URL}/v1/users/obtain-auth-token/`, {
    cache: "no-store",
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const resData = await response.json();

    if (response.status == 200) {
      console.log(resData);
      await SetAuthUserDetails(resData["user_details"]);
      await SetAuthUserTokens(resData["tokens"]["auth_token"]);
      if (prevState.next) {
        redirect(prevState.next);
      }
      return {
        message: "Logged In",
        next: prevState.next,
      };
    } else {
      if (resData.field == "email") {
        return {
          message: "User Not Found",
          next: prevState.next,
        };
      }
      return {
        message: "Invalid Credentials!!",
        next: prevState.next,
      };
    }
  } else {
    console.error("HTTP-Error: " + (await response.text()));
    return {
      message: "Invalid Credentials!!",
      next: prevState.next,
    };
  }
}
