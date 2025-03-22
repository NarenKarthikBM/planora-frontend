"use server";
import { GetAuthUserTokens } from "@/lib/auth/auth-handlers";
import { redirect } from "next/navigation";

export async function sendVerificationOTP() {
  const userAuthTokens = await GetAuthUserTokens();
  if (userAuthTokens == null) {
    redirect("/login");
    return { status: 403 };
  }

  const response = await fetch(`${process.env.API_URL}/v1/users/send-verification-otp/`, {
    cache: "no-store",
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: userAuthTokens.authToken != undefined ? userAuthTokens.authToken : "" },
  });

  const resData = await response.json();

  if (response.status == 200) {
    console.log(resData);
    return {
      message: "Successfully sent OTP",
      status: 200,
    };
  } else {
    return {
      message: "Cannot send OTP",
      status: 400,
    };
  }
}
