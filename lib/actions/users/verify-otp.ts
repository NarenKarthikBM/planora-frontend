"use server";
import { GetAuthUserTokens, SetAuthUserDetails } from "@/lib/auth/auth-handlers";
import { redirect } from "next/navigation";

export async function verifyOTP(prevState: { message: string }, formData: FormData) {
  const userAuthTokens = await GetAuthUserTokens();
  if (userAuthTokens == null) {
    redirect("/login");
    return { message: "unauthorized" };
  }
  const otp = formData.get("otp");

  const response = await fetch(`${process.env.API_URL}/v1/users/verify-otp/`, {
    cache: "no-store",
    method: "POST",
    body: JSON.stringify({ otp: otp }),
    headers: { "Content-Type": "application/json", Authorization: userAuthTokens.authToken != undefined ? userAuthTokens.authToken : "" },
  });

  const resData = await response.json();

  if (response.status == 200) {
    console.log(resData);
    await SetAuthUserDetails(resData["user"]);
    return {
      message: "Successfully verified",
    };
  } else {
    return {
      message: "OTP Invalid",
    };
  }
}
